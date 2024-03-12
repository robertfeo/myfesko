'use server'

import { User } from "@prisma/client";
import bcrypt from 'bcrypt';
import { signJWT, verifyJWT } from "../jwt";
import { compileActivationTemplate, compileResetTemplate, compileSignedWithGooglePassword, sendMail } from "../mail";
import prisma from "../prisma";

export async function verifyTurnstile(token: string): Promise<boolean> {
    const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${token}`,
    });
    const data = await response.json();
    return data.success;
}

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image">, turnstileToken: string) {
    try {
        const isVerified = await verifyTurnstile(turnstileToken);
        if (!isVerified) throw new Error('CAPTCHA verification failed.');
        /* var bcrypt = require('bcryptjs'); */
        const result = await prisma.user.create({
            data: {
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }
        });

        const jwtUserID = signJWT({ id: result.id });
        const activationURL = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserID}`;
        const body = compileActivationTemplate(user.firstname, activationURL);
        await sendMail({
            to: user.email,
            subject: "Activate Your Account",
            body
        });
        return result
    } catch (error) {
        console.error("Error registering user: ", error);
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

export async function forgotPassword(email: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("User not found");
        const jwtUserID = signJWT({ id: user.id });
        const resetURL = `${process.env.NEXTAUTH_URL}/auth/resetPassword/${jwtUserID}`;
        const body = compileResetTemplate(user.firstname, resetURL);
        const sendResult = await sendMail({
            to: user.email,
            subject: "Reset Your Password",
            body
        });
        return "success";
    } catch (error) {
        throw error;
    }
}

type ResetPasswordFunc = (jwtUserID: string, password: string) => Promise<"userNotExist" | "success">;

export const resetPassword: ResetPasswordFunc = async (jwtUserID: string, password: string) => {
    try {
        const payload = verifyJWT(jwtUserID);
        if (!payload) return "userNotExist";
        const userID = payload.id;
        const user = await prisma.user.findUnique({ where: { id: userID } });
        if (!user) return "userNotExist";
        const bcrypt = require('bcryptjs');
        const newPassword = await bcrypt.hash(password, 10);
        const result = await prisma.user.update({ where: { id: userID }, data: { password: newPassword } });
        if (result) return "success";
        else throw new Error("Failed to update password.")
    } catch (error) {
        throw error;
    }
}

export const generateRandomPassword = async (email: string) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    try {
        const body = compileSignedWithGooglePassword(password);
        const sendResult = await sendMail({
            to: email,
            subject: "Your Generated Password",
            body
        });
        return password;
    } catch (error) {
        throw error;
    }
};