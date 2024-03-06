import GoogleIcon from '@mui/icons-material/Google';

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";

const NextAuthProviders = () => {
    const router = useRouter();

    const googleSignIn = async () => {
        await toast.promise(
            submitLoginData(),
            {
                loading: 'Logging in...',
                success: <p>Successfully logged in!</p>,
                error: <p>Unable to log you in. Please try again later.</p>,
            }
        );
        router.push("/");
    };

    const submitLoginData = async () => {
        const result = await signIn("google", {
            redirect: false,
            callbackUrl: "/",
        });
        return result;
    }

    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <p>Sign in with</p>
            <div className="flex flex-row justify-center items-center gap-2">
                <Button size="sm" color="default" onClick={googleSignIn} startContent={<GoogleIcon fontSize="small" />}>Google</Button>
            </div>
        </div>
    );
};

export default NextAuthProviders;