// sessionDao.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new session
export function createSession(userId, ipAddress, deviceInfo) {
    return prisma.session.create({
        data: {
            userId,
            ipAddress,
            deviceInfo,
            sessionId: generateSessionId(),
        },
    });
}

// Get session by sessionId (unique)
export function getSessionById(sessionId) {
    return prisma.session.findUnique({
        where: {
            sessionId,
        },
    });
}

// Get all sessions by userId
export function getSessionsByUserId(userId) {
    return prisma.session.findMany({
        where: {
            userId,
        },
        include: {
            user: true
        },
    });
}

// Update session deviceInfo or other session data
export function updateSessionDeviceInfo(sessionId, deviceInfo) {
    return prisma.session.update({
        where: {
            sessionId,
        },
        data: {
            deviceInfo,
        },
    });
}

// Delete session by sessionId
export function deleteSession(sessionId) {
    return prisma.session.delete({
        where: {
            sessionId,
        },
    });
}
