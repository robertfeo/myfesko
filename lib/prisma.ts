import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient;
};

export const prisma = globalForPrisma.prisma.$extends(withAccelerate()) || new PrismaClient().$extends(withAccelerate());
/* export const prisma = new PrismaClient().$extends(withAccelerate()); */

/* if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; */

export default prisma;