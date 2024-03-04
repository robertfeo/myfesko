"use client";

import { Avatar, Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const LoginButton = () => {
    const { data: session } = useSession();
    console.log({ session });

    return (
        <div className="flex items-center gap-2">
            {session && session.user ? (
                <>
                    <Avatar radius="lg" src={`${session.user.image}`} size="md" />
                    <p>{`${session.user.firstName} ${session.user.lastName}`}</p>
                    <Link
                        className="tex-sky-500 hover:text-sky-600 transition-colors"
                        href={"/api/auth/signout"}
                    >
                        Log Out
                    </Link>
                </>
            ) : (
                <>
                    {/* <Button as={Link} href={"api/auth/signin"} color="primary">Log In</Button> */}
                    {/* <Button as={Link} href={"/auth/login"} color="primary">Log In</Button> */}
                    <Button size="sm" onClick={() => signIn()} color="primary" variant="ghost">Log In</Button>
                    <Button size="sm" as={Link} href={"/auth/register"} color="primary">Register</Button>
                </>
            )}
        </div>
    );
};

export default LoginButton;