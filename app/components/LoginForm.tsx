/* eslint-disable react/no-unescaped-entities */
"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { verifyTurnstile } from "@/lib/actions/authActions";
import { Turnstile } from "@marsidev/react-turnstile";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { z } from "zod";
import NextAuthProviders from "./NextAuthProviders";

interface LoginFormProps {
    callbackUrl?: string;
    className?: string;
}

const FormSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string({
        required_error: "Please enter your password",
    }),
});

type InputType = z.infer<typeof FormSchema>;

const LoginForm = ({ callbackUrl, className = "" }: LoginFormProps) => {
    const router = useRouter();
    const [visiblePass, setVisiblePass] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit: SubmitHandler<InputType> = async (data) => {
        if (!token) {
            toast.error("Please verify you are not a robot.");
            return;
        } else {
            const verifyTurnstileToken = await verifyTurnstile(token);
            if (!verifyTurnstileToken) {
                toast.error("Please verify you are not a robot.");
                return;
            }
            const result = await signIn("credentials", {
                redirect: false,
                username: data.email,
                password: data.password,
            });
            if (!result?.ok) {
                toast.error(result?.error!);
                return;
            }
            if (result?.status === 200) {
                toast.success("Logged in successfully!");
                router.push(callbackUrl ? callbackUrl : "/");
            }
        }
    };

    return (
        <>
            <div className={`flex-col items-center ${className}`}>
                <NextAuthProviders />
                <hr className="w-full my-4" />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`w-full flex flex-col items-center`}
                >
                    <div className="flex flex-col items-center gap-3 ml-2 mr-2">
                        <h1 className="text-2xl font-bold text-center">Login</h1>
                        <p className="text-center text-md">To see the content of the website, please log in with your credentials.</p>
                        <Input label="Email" {...register("email")} errorMessage={errors.email?.message} />
                        <Input
                            label="Password"
                            {...register("password")}
                            type={visiblePass ? "text" : "password"}
                            errorMessage={errors.password?.message}
                            endContent={
                                <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
                                    {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
                                </button>
                            }
                        />
                        <div className="flex flex-row items-center justify-center gap-2">
                            <p>Forgot password?</p>
                            <Link className="text-[#338DF3]" href={"/auth/forgotPassword"}>Reset password</Link>
                        </div>
                        <Turnstile
                            options={{
                                theme: "light",
                            }}
                            className="mb-4"
                            color="light"
                            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY!}
                            onSuccess={setToken}
                            onLoad={() => toast.loading("Verifing User...")} />
                    </div>
                    <div className="flex w-full items-center justify-center">
                        <Button size="sm" className="w-full shadow-sm backdrop-blur-sm" color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                            {isSubmitting ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginForm;