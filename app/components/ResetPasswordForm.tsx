/* eslint-disable react/no-unescaped-entities */
"use client";
import { resetPassword } from "@/lib/actions/authActions";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";

interface Props {
    jwtUserID: string,
    className?: string
}

const FormSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }).max(50, { message: "Password must be at most 50 characters long." }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords does not match.", path: ["confirmPassword"]
});

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserID, className }: Props) => {
    const [visiblePass, setVisiblePass] = useState(false);
    const [passStrength, setPassStrength] = useState(0)

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id);
    }, [watch().password]);

    const resetPass: SubmitHandler<InputType> = async (data) => {
        try {
            const result = await resetPassword(jwtUserID, data.password);
            if (result === "success") {
                toast.success("Your password has been reset successfully");
            } else {
                toast.error("Error resetting your password");
            }
        } catch (error) {
            toast.error("Error resetting your password");
        }

    }

    return (
        <div className={`p-8 ${className}`}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reset Your Password</h2>
            <p className="text-gray-600 mb-8">Enter a new password for your account. Make sure it's strong and secure.</p>
            <form className="flex flex-col gap-4 w-full max-w-lg" onSubmit={handleSubmit(resetPass)}>
                <Input size="sm" type={visiblePass ? "text" : "password"} label="Password" {...register("password")} errorMessage={errors.password?.message} endContent={
                    <button type="button" onClick={() => setVisiblePass((prev) => !prev)} className="text-gray-400 hover:text-gray-600">
                        {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
                    </button>
                } />
                <PasswordStrength passStrength={passStrength}></PasswordStrength>
                <Input size="sm" type="password" label="Confirm Password" {...register("confirmPassword")} errorMessage={errors.confirmPassword?.message} />
                <Button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline" size="sm" type="submit" color="primary" disabled={isSubmitting} isLoading={isSubmitting}>
                    {isSubmitting ? "Please Wait..." : "Reset Password"}
                </Button>
            </form>
        </div>
    )
}

export default ResetPasswordForm
