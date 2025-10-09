// app/components/SessionTracker.tsx

"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function SessionTracker() {
    // const router = useRouter();

    useEffect(() => {
        const trackSession = async () => {
            try {
                // Make the GET request to track the session
                await fetch('/api/track-session', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.error('Error tracking session:', error);
            }
        };

        // Track session on initial page load
        trackSession();

        // Optionally track session on route changes (client-side navigation)
        const handleRouteChange = () => {
            trackSession();
        };

        // router.events.on('routeChangeComplete', handleRouteChange);

        // Cleanup event listener when component unmounts
        return () => {
            // router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, []);

    return null; // This component doesn't render anything
}
