"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";

interface Props {
    jwtUserID: string
}

const FormSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long." }).max(50, { message: "Password must be at most 50 characters long." }),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords does not match.", path: ["confirmPassword"]
});

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserID }: Props) => {
    const [visiblePass, setVisiblePass] = useState(false);
    const [passStrength, setPassStrength] = useState(0)

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id);
    }, [watch().password]);

    return (
        <div>
            <form onSubmit={handleSubmit(data => console.log(data))}>
                <Input type={visiblePass ? "text" : "password"} label="Password" {...register("password")} errorMessage={errors.password?.message} endContent={
                    <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
                        {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
                    </button>
                } />
                <PasswordStrength passStrength={passStrength}></PasswordStrength>
                <Input type={visiblePass ? "text" : "password"} label="Confirm Password" {...register("confirmPassword")} errorMessage={errors.confirmPassword?.message} />
                <Button type="submit" color="primary" disabled={isSubmitting}>
                    {isSubmitting ? "Please Wait..." : "Reset"}
                </Button>
            </form>
        </div>
    )
}

export default ResetPasswordForm