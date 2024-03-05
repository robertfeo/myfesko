"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

const LoginButton = () => {
    const { data: session } = useSession();

    return (
        <>
            {session && session.user ? (
                <>
                    <ProfileMenu />
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => signIn()} color="primary" variant="ghost">Log In</Button>
                        <Button size="sm" as={Link} href={"/auth/register"} color="primary">Register</Button>
                    </div>
                </>
            )}
        </>
    );
};

export default LoginButton;