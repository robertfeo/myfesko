import GoogleIcon from '@mui/icons-material/Google';

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";

const NextAuthProviders = () => {
    const googleSignIn = async () => {
        const result = await signIn("Google", {
            callbackUrl: "/",
        });
        console.log({ result });
    };
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <p>Sign in with</p>
            <div className="flex flex-row justify-center items-center gap-2">
                <Button size="sm" color="default" onClick={googleSignIn} startContent={<GoogleIcon fontSize="small"/>}>Google</Button>
            </div>
        </div>
    );
};

export default NextAuthProviders;