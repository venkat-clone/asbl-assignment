// userDao.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new user
export function createUser(data) {
    return prisma.user.create({
        data
    });
}

// Get user by phone (unique)
export function getUserByPhone(phone:String) {
    return prisma.user.findUnique({
        where: {
            phone,
        },
    });
}

// Update user query field
export function updateUserQuery(userId:Number, query:String) {
    return prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            query,
        },
    });
}

// Delete user by ID
export function deleteUser(userId:Number) {
    return prisma.user.delete({
        where: {
            id: userId,
        },
    });
}

// Get all sessions for a user
export function getSessionsByUserId(userId:Number) {
    return prisma.session.findMany({
        where: {
            userId,
        },
    });
}
