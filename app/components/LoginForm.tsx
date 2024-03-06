/* eslint-disable react/no-unescaped-entities */
"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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

    const [visiblePass, setVisiblePass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    const submitLoginData = async (data: InputType) => {
        const result = signIn("credentials", {
            redirect: false,
            /* callbackUrl: callbackUrl ? callbackUrl : "/", */
            username: data.email,
            password: data.password,
        });
        if (!result) {
            return "error"
        }
        return result;
    }

    const onSubmit: SubmitHandler<InputType> = async (data) => {
        await toast.promise(
            submitLoginData(data),
            {
                loading: 'Logging in...',
                success: <p>Successfully logged in!</p>,
                error: <p>Unable to log you in. Please try again later.</p>,
            }
        );
        router.push(callbackUrl ? callbackUrl : "/");
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`flex flex-col items-center overflow-hidden ${className}`}
            >
                <NextAuthProviders />
                <hr className="w-full my-4" />
                <div className="p-2 flex flex-col gap-4 m-0 p-2 mt-2 ml-2 mr-2">
                    <h1 className="text-2xl font-bold text-center">Login</h1>
                    <p className="text-center">To see the content of the website, please log in with your credentials.</p>
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
                    <Button size="sm" className="shadow-sm backdrop-blur-sm" color="primary" type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;