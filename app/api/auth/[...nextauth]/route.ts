import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const bcrypt = require('bcryptjs');

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.username
                    }
                });
                if (!user) throw new Error('No user found')

                if (!credentials?.password) throw new Error('Please provide a password')
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordValid) throw new Error('Username or Password is incorrect')

                const { password, ...userWithoutPass } = user
                return userWithoutPass
            }
        }),
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
