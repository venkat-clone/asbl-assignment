// app/api/analytics/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
    try {
        const sessionId = request.cookies.get('sessionId')?.value;
        const userId = request.cookies.get('userId')?.value;
        const deviceIdCookie = request.cookies.get('deviceId')?.value;

        if (sessionId) {
            // End current session
            await prisma.session.update({
                where: { id: sessionId },
                data: {
                    endTime: new Date(),
                    isAuthenticated: false,
                    endReason: 'user_logout',
                },
            });

            // Track logout event
            await prisma.event.create({
                data: {
                    sessionId,
                    deviceId: deviceIdCookie || '',
                    userId: userId || undefined,
                    eventType: 'user_logout',
                    pageUrl: request.headers.get('referer') || '',
                },
            });
        }

        if (deviceIdCookie && userId) {
            // Mark device-user mapping as inactive
            await prisma.deviceUserMapping.updateMany({
                where: {
                    deviceId: deviceIdCookie,
                    userId: userId,
                },
                data: { isActive: false },
            });
        }

        // Create response with cleared user cookie but keep device cookie
        const response = NextResponse.json({ success: true });

        // Clear user cookie
        response.cookies.delete('userId');

        // Create new session ID
        const newSessionId = uuidv4();
        response.cookies.set('sessionId', newSessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 60,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Failed to logout' },
            { status: 500 }
        );
    }
}
