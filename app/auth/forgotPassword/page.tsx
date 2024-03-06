"use client";

import { forgotPassword } from "@/lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
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
        <div className="min-h-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Your Password?</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter the email address associated with your account, and we’ll send you a link to reset your password.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitRequest)}>
                    <div className="rounded-md -space-y-px">
                        <Input
                            label="Email"
                            {...register("email")}
                            startContent={<EnvelopeIcon className="w-5 text-gray-400" />}
                            errorMessage={errors.email?.message}
                            className="w-full "
                        />
                    </div>

                    <Button
                        className="w-full"
                        color="primary"
                        size="sm"
                        type="submit"
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                    >
                        {isSubmitting ? "Please Wait..." : "Send Reset Link"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ForgetPasswordPage;