"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import ProfileMenu from "./ProfileMenu";

const LoginButton = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const keycloaSignIn = async () => {
        await toast.promise(
            submitSSOLoginData(),
            {
                loading: 'Logging in...',
                success: <p>Successfully logged in!</p>,
                error: <p>Unable to log you in. Please try again later.</p>,
            }
        );
        router.push("/");
    };

    const submitSSOLoginData = async () => {
        const result = await signIn("keycloak", {
            redirect: false,
            callbackUrl: "/",
        });
        return result;
    }

    return (
        <>
            {session && session.user ? (
                <>
                    <ProfileMenu />
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => keycloaSignIn()} color="default" variant="light">Log In</Button>
                    </div>
                </>
            )}
        </>
    );
};

export default LoginButton;