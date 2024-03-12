import { generateRandomPassword } from "@/lib/actions/authActions";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const winston = require("winston");

const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});

export const authOptions: AuthOptions = {
    logger: {
        error(code, metadata) {
            logger.error(code, metadata)
        },
        warn(code) {
            logger.warn(code)
        },
        debug(code, metadata) {
            logger.debug(code, metadata)
        }
    },
    pages: {
        signIn: '/auth/login',
    },
    session: {
        strategy: 'jwt',
        maxAge: 10 * 24 * 60 * 60,
    },
    providers: [
        GoogleProvider({
            name: 'Google',
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    firstname: profile.given_name,
                    lastname: profile.family_name,
                    email: profile.email,
                    image: profile.picture,
                    emailVerified: profile.email_verified,
                };
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
                    /* cacheStrategy: {
                        ttl: 30,
                        swr: 60,
                    }, */
                    where: {
                        email: credentials?.username
                    },
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
        async signIn({ account, user }) {
            if (account!.provider === "google") {
                if (user) {
                    const userSignedIn = user as User;
                    const searchUser = await prisma.user.findUnique({
                        where: {
                            email: userSignedIn!.email!
                        }
                    });
                    if (userSignedIn.emailVerified && !searchUser) {
                        const bcrypt = require('bcryptjs');
                        await prisma.user.create({
                            data: {
                                email: user.email!,
                                firstname: userSignedIn.firstname as string,
                                lastname: userSignedIn.lastname,
                                image: userSignedIn.image,
                                password: await bcrypt.hash(await generateRandomPassword(user.email as string), 10),
                                emailVerified: new Date(),
                            }
                        })
                    }
                }
            }
            return true
        },
        async jwt({ token, user }) {
            if (user) token.user = user as User;
            return token;
        },
        async session({ token, session }) {
            if (token?.user) {
                session.user = token.user;
            }
            session.user = token.user;
            return session;
        },
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };

