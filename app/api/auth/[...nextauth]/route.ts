import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
            idToken: true,
            authorization: {
                params: {
                    scope: "openid profile email",
                },
            },
        }),
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

                if (!user.emailVerified) throw new Error('User is not verified. Please verify your email.')

                const { password, ...userWithoutPass } = user
                return userWithoutPass
            }
        }),
    ],

    callbacks: {
        // take user object and put in token object
        async jwt({ token, user }) {
            if (user) {
                token.user = user as User;
            }
            return token;
        },

        // take token object and put in session object
        async session({ token, session }) {
            session.user = token.user;
            return session;
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
