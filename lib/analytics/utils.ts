// lib/analytics/utils.ts
import { v4 as uuidv4 } from 'uuid';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function generateSessionId(): string {
    return uuidv4();
}

export async function generateDeviceFingerprint(): Promise<string> {
    if (typeof window === 'undefined') return '';

    const fp = await FingerprintJS.load();
    const result = await fp.get();
    return result.visitorId;
}

export function getDeviceInfo() {
    if (typeof window === 'undefined') return null;

    return {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        deviceType: getDeviceType(),
    };
}

function getDeviceType(): string {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }
    return 'desktop';
}

export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

export function setCookie(name: string, value: string, days: number = 30) {
    if (typeof document === 'undefined') return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}
