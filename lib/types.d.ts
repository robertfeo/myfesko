import { Account, User } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        user: User;
        account: Account;
        session: Session;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: User;
        account: Account;
        session: Session;
    }
}

/* declare module '*.handlebars' {
    const template: (context: any) => string;
    export default template;
} */