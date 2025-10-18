// components/Analytics.tsx
'use client';

import { useAnalytics } from '@/hooks/useAnalytics';

export function CAnalytics() {
    useAnalytics(); // Initialize tracking
    return null; // This component doesn't render anything
}
