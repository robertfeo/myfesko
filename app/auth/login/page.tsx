"use client";

import LoginForm from "@/app/components/LoginForm";

interface Props {
    searchParams: {
        callbackUrl?: string;
    };
}

const LoginPage = ({ searchParams }: Props) => {
    return (
        <>
            <div className="flex flex-col items-center w-full">
                <LoginForm callbackUrl={searchParams.callbackUrl} className="max-w-md h-fit pt-5 pb-5" />
            </div>
        </>
    );
};

export default LoginPage;
