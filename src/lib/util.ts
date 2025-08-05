import { NextRequest } from 'next/server';

// Get client IP address
export function getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');

    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }

    if (realIP) {
        return realIP;
    }

    return 'unknown';
}

// Extract name from email (client part)
export function extractNameFromEmail(email: string): string {
    const clientPart = email.split('@')[0];
    // Replace dots, underscores, numbers with spaces and capitalize
    return clientPart
        .replace(/[._\d]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
        .trim() || 'Newsletter Subscriber';
}