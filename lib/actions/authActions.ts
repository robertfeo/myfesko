'use server'

import { PrismaClient, User } from "@prisma/client";
import { signJWT, verifyJWT } from "../jwt";
import { compileActivationTemplate, sendMail } from "../mail";
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

        const jwtUserID = signJWT({ id: result.id });
        const activationURL = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserID}`;
        const body = compileActivationTemplate(user.firstName, activationURL);
        await sendMail({
            to: user.email,
            subject: "Activate Your Account",
            body
        });
        return result
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

type ActivateUserFunc = (jwtUserID: string) => Promise<"userNotExist" | "alreadyActivated" | "success">;

export const activateUser: ActivateUserFunc = async (jwtUserID) => {
    try {
        const payload = verifyJWT(jwtUserID);
        const userID = payload?.id;
        const user = await prisma.user.findUnique({ where: { id: userID } });
        if (!user) return "userNotExist";
        if (user.emailVerified) return "alreadyActivated";
        const result = await prisma.user.update({ where: { id: userID }, data: { emailVerified: new Date() } });
        return "success";
    }
    catch (error) {
        console.error("Error activating user:", error);
        throw error;
    }
}