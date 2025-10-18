// app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            eventType,
            eventName,
            eventData,
            pageUrl,
            pagePath,
            pageTitle,
            referrer,
            deviceFingerprint,
            deviceInfo,
        } = body;

        // Get session and device from cookies
        const sessionId = request.cookies.get('sessionId')?.value;
        const deviceIdCookie = request.cookies.get('deviceId')?.value;
        const userId = request.cookies.get('userId')?.value || null;

        if (!sessionId) {
            return NextResponse.json(
                { error: 'No session found' },
                { status: 400 }
            );
        }

        // Find or create device
        let device = await prisma.device.findUnique({
            where: { fingerprint: deviceFingerprint },
        });

        if (!device) {
            device = await prisma.device.create({
                data: {
                    id: deviceIdCookie || undefined,
                    fingerprint: deviceFingerprint,
                    userAgent: deviceInfo?.userAgent,
                    browser: deviceInfo?.browser,
                    os: deviceInfo?.os,
                    deviceType: deviceInfo?.deviceType,
                    screenResolution: deviceInfo?.screenResolution,
                    timezone: deviceInfo?.timezone,
                    language: deviceInfo?.language,
                    ipAddress: request.headers.get('x-forwarded-for') ,
                },
            });
        }

        // Find or create session
        let session = await prisma.session.findUnique({
            where: { id: sessionId },
        });

        if (!session) {
            session = await prisma.session.create({
                data: {
                    id: sessionId,
                    deviceId: device.id,
                    userId: userId,
                    isAuthenticated: !!userId,
                    referrer: referrer,
                    landingPage: pageUrl,
                },
            });
        } else {
            // Update last activity
            await prisma.session.update({
                where: { id: sessionId },
                data: { lastActivityAt: new Date() },
            });
        }

        // Create event
        const event = await prisma.event.create({
            data: {
                sessionId: session.id,
                deviceId: device.id,
                userId: userId,
                eventType,
                eventName,
                pageUrl,
                pagePath,
                pageTitle,
                referrer,
                eventData: eventData || {},
            },
        });

        // If it's a page view, create PageView record
        if (eventType === 'page_view') {
            await prisma.pageView.create({
                data: {
                    sessionId: session.id,
                    pageUrl,
                    pagePath: pagePath || new URL(pageUrl).pathname,
                    pageTitle,
                    referrer,
                    isRefresh: eventData?.isRefresh || false,
                },
            });
        }

        return NextResponse.json({ success: true, eventId: event.id });
    } catch (error) {
        console.error('Analytics tracking error:', error);
        return NextResponse.json(
            { error: 'Failed to track event' },
            { status: 500 }
        );
    }
}
