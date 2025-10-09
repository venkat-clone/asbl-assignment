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
  userAgent: req.headers.get('user-agent') || '',  // User-Agent string
  referrer: req.referrer || '',                    // Referrer URL
  url: req.url || '',                              // The URL of the current request
  // Optionally, you can store headers as a simple object, but avoid storing entire Headers object
  headers: Object.fromEntries(req.headers.entries()),  // Convert headers to a plain object
  // Referrer Policy might not be easily serializable, you can store as string or omit it
  referrerPolicy: req.referrerPolicy || 'no-referrer',  // Assuming referrerPolicy is string type
};



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





