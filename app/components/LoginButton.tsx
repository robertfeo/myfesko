"use client";

import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const LoginButton = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center gap-2">
            {session && session.user ? (
                <>
                    <p>{session.user.email}</p>
                    <Link
                        className="tex-sky-500 hover:text-sky-600 transition-colors"
                        href={"/api/auth/signout"}
                    >
                        Log Out
                    </Link>
                </>
            ) : (
                <>
                    <Button className="pr-3" as={Link} href={"api/auth/signin"} color="primary">Log In</Button>
                    <Button as={Link} href={"/auth/register"} color="primary">
                        Register
                    </Button>
                </>
            )}
        </div>
    );
};

export default LoginButton;