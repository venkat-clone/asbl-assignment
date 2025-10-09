import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'; 
import { generateSessionId } from '@/lib/utils' 


const prisma = new PrismaClient();


export async function GET(req: Request) {

  console.log(`Request: ${JSON.stringify(req)}`)
  try {
    // Get user's IP address from request headers (or use a default)
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('remote-address') || 'unknown'

    // Get device info from the 'User-Agent' header (or other headers)
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const deviceInfo = {
      userAgent,
    }

    // Derive the endpoint (path) from the request URL
    const endPoint = req.url.split(req.headers.get('host') || '')[1] || '/'

    // Create a new session for the user
    const session = await prisma.session.create({
      data: {
        ipAddress,
        deviceInfo,
        sessionId: generateSessionId(), // Generate a unique session ID (e.g., UUID)
        endPoint,  // Track the page the user is visiting
      },
    })

    // Optionally log the session activity (for analytics)
    console.log("[Session] User accessed:", {
      ipAddress,
      userAgent,
      endPoint,
      sessionId: session.sessionId,
    })

    // Respond with a success message and the session ID
    return NextResponse.json({ ok: true, sessionId: session.sessionId })
  } catch (err) {
    console.error("Error in GET handler:", err)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}





export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Basic server-side validation
    const { fullName, email, phone, project, message, company } = body || {}

    if (!fullName || !email || !phone || !project) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Retrieve the client's IP address from request headers or metadata
    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('remote-address') || 'unknown'

    // Get device info from the 'User-Agent' header (or other headers)
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const deviceInfo = {
      userAgent,
    }

    // Derive the endpoint (path) from the request URL
    const endPoint = req.url.split(req.headers.get('host') || '')[1] || '/'

    // Check if the user exists or create a new user
    let user = await prisma.user.findUnique({
      where: {
        phone,
      },
    })

    // If user doesn't exist, create a new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          phone,
          query: message?.slice(0, 500) ?? "",  // Optional query
        },
      })
    }

    // Update previous sessions with the same IP address to map to this user
    await prisma.session.updateMany({
      where: {
        ipAddress,
        userId: null,  // Only update sessions that are not currently associated with any user
      },
      data: {
        userId: user.id,  // Map them to the newly found/created user
      },
    })

    // Create a new session for the user
    const session = await prisma.session.create({
      data: {
        userId: user.id,
        ipAddress,
        deviceInfo,
        sessionId: generateSessionId(),  // Generate a unique session ID (e.g., UUID)
        endPoint,  // Track the endpoint that was accessed
      },
    })

    // Log the enquiry (you could also integrate email/CRM here)
    console.log("[enquiry] New enquiry:", {
      fullName,
      email,
      phone,
      project,
      message: message?.slice?.(0, 500) ?? "",
    })

    // Respond with a success message
    return NextResponse.json({ ok: true, sessionId: session.sessionId })
  } catch (err) {
    console.error("Error in POST handler:", err)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
