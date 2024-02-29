'use server'

import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image">) {
    try {
        var bcrypt = require('bcryptjs');
        const result = await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }
        });
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}
