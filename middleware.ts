// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Check for existing session cookie
    const sessionId = request.cookies.get('sessionId')?.value;
    const deviceId = request.cookies.get('deviceId')?.value;

    // Create new session if doesn't exist
    if (!sessionId) {
        const newSessionId = uuidv4();
        response.cookies.set('sessionId', newSessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 60, // 30 minutes
            path: '/',
        });
    }

    // Create device ID if doesn't exist (long-term)
    if (!deviceId) {
        const newDeviceId = uuidv4();
        response.cookies.set('deviceId', newDeviceId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 365 * 24 * 60 * 60, // 1 year
            path: '/',
        });
    }

    // Update last activity timestamp
    response.cookies.set('lastActivity', Date.now().toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 60,
        path: '/',
    });

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes (handled separately)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
