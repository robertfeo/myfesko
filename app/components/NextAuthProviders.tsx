/* eslint-disable react/jsx-no-undef */

import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import { GoogleLoginButton } from "react-social-login-buttons";
import KeycloakLogin from "./buttons/KeycloakLogin";


const NextAuthProviders = () => {
    const router = useRouter();

    const googleSignIn = async () => {
        await toast.promise(
            submitgoogleLoginData(),
            {
                loading: 'Logging in...',
                success: <p>Successfully logged in!</p>,
                error: <p>Unable to log you in. Please try again later.</p>,
            }
        );
        router.push("/");
    };

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

    const submitgoogleLoginData = async () => {
        const result = await signIn("google", {
            redirect: false,
            callbackUrl: "/",
        });
        return result;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3 m-auto">
            <p className="text-md">Sign in with</p>
            <div className="flex flex-row justify-center items-center gap-3 m-auto">
                <KeycloakLogin className="font-medium"
                    style={{ fontSize: '13px', borderRadius: '10px', width: '100px' }}
                    align="center"
                    size="32px"
                    iconSize="17px"
                    onClick={keycloaSignIn} />

                <GoogleLoginButton
                    text="Google"
                    className="font-medium"
                    style={{ fontSize: '13px', borderRadius: '10px', width: '100px' }}
                    align="center"
                    size="32px"
                    iconSize="17px"
                    onClick={googleSignIn}
                />
            </div>
        </div>
    );
};

export default NextAuthProviders;