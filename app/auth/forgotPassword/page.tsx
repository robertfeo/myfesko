"use client";

import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const FormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid Email." }),
});

type InputType = z.infer<typeof FormSchema>;

const ForgetPasswordPage = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema),
    });

    const submitRequest: SubmitHandler<InputType> = async (data) => {
        try {
            const result = await forgotPassword(data.email);
            if (result === "success") {
                toast.success("Password reset link sent to your email.");
                reset();
            }
        } catch (e) {
            if (e instanceof Error) {
                toast.error(e.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3">
            <form onSubmit={handleSubmit(submitRequest)}>
                <Input label="Email" {...register("email")} startContent={<EnvelopeIcon className="w-4" />} errorMessage={errors.email?.message} />
                <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                    {isSubmitting ? "Please Wait..." : "Send"}
                </Button>
            </form>
        </div>
    );
}

export default ForgetPasswordPage;