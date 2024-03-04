"use client";

import { Avatar, Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const LoginButton = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center gap-2">
            {session && session.user ? (
                <>
                    <Avatar radius="lg" src={`${session.user.image}`} size="sm" />
                    <p className="text-medium">{`${session.user.firstName} ${session.user.lastName}`}</p>
                    <Link
                        className="tex-sky-500 hover:text-sky-600 transition-colors text-medium"
                        href={"/api/auth/signout"}
                    >
                        Log Out
                    </Link>
                </>
            ) : (
                <>
                    <Button size="sm" onClick={() => signIn()} color="primary" variant="ghost">Log In</Button>
                    <Button size="sm" as={Link} href={"/auth/register"} color="primary">Register</Button>
                </>
            )}
        </div>
    );
};

export default LoginButton;