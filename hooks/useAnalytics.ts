// hooks/useAnalytics.ts
'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { generateDeviceFingerprint, getDeviceInfo } from '@/lib/analytics/utils';

export function useAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const deviceFingerprintRef = useRef<string>('');
    const lastPageRef = useRef<string>('');

    useEffect(() => {
        // Initialize device fingerprint
        generateDeviceFingerprint().then((fingerprint) => {
            deviceFingerprintRef.current = fingerprint;
        });
    }, []);

    const trackEvent = useCallback(async (
        eventType: string,
        eventName?: string,
        eventData?: Record<string, any>
    ) => {
        try {
            const deviceInfo = getDeviceInfo();

            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventType,
                    eventName,
                    eventData,
                    pageUrl: window.location.href,
                    pagePath: pathname,
                    pageTitle: document.title,
                    referrer: document.referrer,
                    deviceFingerprint: deviceFingerprintRef.current,
                    deviceInfo,
                }),
            });
        } catch (error) {
            console.error('Failed to track event:', error);
        }
    }, [pathname]);

    // Track page views
    useEffect(() => {
        const currentPage = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // Check if it's a page refresh or navigation
        const isRefresh = lastPageRef.current === currentPage;

        trackEvent('page_view', undefined, { isRefresh });

        lastPageRef.current = currentPage;
    }, [pathname, searchParams, trackEvent]);

    // Track clicks
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const clickedElement = target.closest('a, button');

            if (clickedElement) {
                trackEvent('click', undefined, {
                    elementType: clickedElement.tagName.toLowerCase(),
                    elementText: clickedElement.textContent?.substring(0, 100),
                    elementId: clickedElement.id,
                    elementClass: clickedElement.className,
                });
            }
        };

        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [trackEvent]);

    // Track scroll depth
    useEffect(() => {
        let maxScrollDepth = 0;

        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollDepth = Math.round(((scrollTop + windowHeight) / documentHeight) * 100);

            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;

                // Track at 25%, 50%, 75%, 100%
                if ([25, 50, 75, 100].includes(maxScrollDepth)) {
                    trackEvent('scroll', `${maxScrollDepth}%`, { scrollDepth: maxScrollDepth });
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [trackEvent]);

    return { trackEvent };
}
