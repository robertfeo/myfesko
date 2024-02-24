"use server"

import { PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image" | "phoneNumber">) {
    const result = await prisma.user.create({
        data: user
    })
}