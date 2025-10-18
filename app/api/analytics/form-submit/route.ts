// app/api/analytics/form-submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { mobileNumber, email, name, formType, formData } = body;

        const sessionId = request.cookies.get('sessionId')?.value;
        const deviceIdCookie = request.cookies.get('deviceId')?.value;

        if (!sessionId || !deviceIdCookie) {
            return NextResponse.json(
                { error: 'No session found' },
                { status: 400 }
            );
        }

        // Check if user already exists (returning user on new device)
        let user = await prisma.user.findUnique({
            where: { mobileNumber },
            include: { devices: true },
        });

        const isNewUser = !user;

        // Create or update user
        if (!user) {
            user = await prisma.user.create({
                data: {
                    mobileNumber,
                    email,
                    name,
                },
            });
        } else {
            // Update user info if provided
            user = await prisma.user.update({
                where: { id: user.id },
                data: {
                    email: email || user.email,
                    name: name || user.name,
                },
            });
        }

        // Get current device
        const device = await prisma.device.findFirst({
            where: { id: deviceIdCookie },
        });

        if (device) {
            // Create or update device-user mapping
            await prisma.deviceUserMapping.upsert({
                where: {
                    deviceId_userId: {
                        deviceId: device.id,
                        userId: user.id,
                    },
                },
                create: {
                    deviceId: device.id,
                    userId: user.id,
                    loginCount: 1,
                    isActive: true,
                },
                update: {
                    lastLoginAt: new Date(),
                    loginCount: { increment: 1 },
                    isActive: true,
                },
            });

            // Mark other users on this device as inactive
            await prisma.deviceUserMapping.updateMany({
                where: {
                    deviceId: device.id,
                    userId: { not: user.id },
                    isActive: true,
                },
                data: { isActive: false },
            });
        }

        // Update current session with user ID
        await prisma.session.update({
            where: { id: sessionId },
            data: {
                userId: user.id,
                isAuthenticated: true,
            },
        });

        // Merge all anonymous events from this session to the user
        await prisma.event.updateMany({
            where: {
                sessionId: sessionId,
                userId: null,
            },
            data: {
                userId: user.id,
            },
        });

        // Create form submission record
        await prisma.formSubmission.create({
            data: {
                userId: user.id,
                formType,
                formData,
                ipAddress: request.headers.get('x-forwarded-for') || request.ip,
                userAgent: request.headers.get('user-agent'),
            },
        });

        // Track form submission event
        await prisma.event.create({
            data: {
                sessionId,
                deviceId: device?.id || deviceIdCookie,
                userId: user.id,
                eventType: 'form_submission',
                eventName: formType,
                pageUrl: request.headers.get('referer') || '',
                eventData: { formType, isNewUser },
            },
        });

        // Set user cookie for future requests
        const response = NextResponse.json({
            success: true,
            userId: user.id,
            isNewUser,
        });

        response.cookies.set('userId', user.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60, // 1 year
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Form submission error:', error);
        return NextResponse.json(
            { error: 'Failed to submit form' },
            { status: 500 }
        );
    }
}
