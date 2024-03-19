"use client";
import { Turnstile } from "@marsidev/react-turnstile";
import toast from "react-hot-toast";

interface CloudflareTurnstileProps {
    setToken: (token: string) => void;
}

const CloudflareTurnstile = ({ setToken }: CloudflareTurnstileProps) => {

    return (
        <>
            <Turnstile
                options={{
                    theme: "light",
                }}
                className="mb-4"
                color="light"
                siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                onSuccess={setToken}
                onLoad={() => toast.loading("Verifing User...")} />
        </>
    );
};

export default CloudflareTurnstile;