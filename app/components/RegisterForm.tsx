"use client";
import { registerUser } from "@/lib/actions/authActions";
import {
    EnvelopeIcon,
    EyeIcon,
    EyeSlashIcon,
    LockClosedIcon,
    PhoneIcon,
    UserIcon
} from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import validator from "validator";
import { z } from "zod";
import PasswordStrength from "./PasswordStrength";

const FormSchema = z.object({
    firstname: z.string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(45, "First Name must be at most 45 characters long.")
        .regex(new RegExp("^[a-zA-Z+]+$"), "No special characters allowed!"),
    lastname: z.string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(45, "First Name must be at most 45 characters long.")
        .regex(new RegExp("^[a-zA-Z+]+$"), "No special characters allowed!"),
    email: z.string().email("Please enter a valid email address."),
    phoneNumber: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number."),
    password: z.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(45, "Password must be at most 45 characters long."),
    confirmPassword: z.string()
        .min(8, "Password must be at least 8 characters long.")
        .max(45, "Password must be at most 45 characters long."),
    acceptedTerms: z.literal(true, {
        errorMap: () => ({ message: "You must accept the terms and conditions to sign up." })
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"]
})

type InputType = z.infer<typeof FormSchema>

const RegisterForm = () => {
    const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    useEffect(() => {
        setPassStrength(passwordStrength(watch().password).id);
    }, [watch().password]);

    const [passStrength, setPassStrength] = useState(0)
    const [isVisiblePass, setIsVisiblePass] = useState(false)
    const toggleVisiblePass = () => setIsVisiblePass(prev => !prev)
    const saveUser: SubmitHandler<InputType> = async (data) => {
        const { acceptedTerms, confirmPassword, ...user } = data

        try {
            const result = await registerUser(user)
            toast.success("User registered successfully!")
        } catch (error) {
            toast.error("An error occurred while registering the user.")
        }
        reset()
    }

    return (
        <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3 p-5 justify-center items-center">
            <Input size="sm" errorMessage={errors.firstname?.message} isInvalid={!!errors.firstname} {...register("firstname")} label="First Name" startContent={<UserIcon className="w-4"></UserIcon>}></Input>
            <Input size="sm" errorMessage={errors.lastname?.message} isInvalid={!!errors.lastname} {...register("lastname")} label="Last Name" startContent={<UserIcon className="w-4"></UserIcon>}></Input>
            <Input size="sm" errorMessage={errors.email?.message} isInvalid={!!errors.email} {...register("email")} className="col-span-2" type="email" label="Email" startContent={<EnvelopeIcon className="w-4"></EnvelopeIcon>}></Input>
            <Input size="sm" errorMessage={errors.phoneNumber?.message} isInvalid={!!errors.phoneNumber} {...register("phoneNumber")} className="col-span-2" type="phone" label="Phone" startContent={<PhoneIcon className="w-4"></PhoneIcon>}></Input>
            <Input size="sm" errorMessage={errors.password?.message} isInvalid={!!errors.password} {...register("password")} className="col-span-2" type={isVisiblePass ? "text" : "password"} label="Password" startContent={<LockClosedIcon className="w-4" />}
                endContent={
                    isVisiblePass ? (<EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}></EyeIcon>) : (<EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}></EyeSlashIcon>)
                }>
            </Input>
            <PasswordStrength passStrength={passStrength}></PasswordStrength>
            <Input errorMessage={errors.confirmPassword?.message} isInvalid={!!errors.confirmPassword} {...register("confirmPassword")} className="col-span-2" type="password" label="Confirm Password" startContent={<LockClosedIcon className="w-4" />}></Input>
            <div className="flex flex-col col-span-2 justify-center items-center gap-3">
                <Controller control={control} name="acceptedTerms" render={({ field }) => {
                    return <Checkbox size="sm" onChange={field.onChange} onBlur={field.onBlur}>I Accept The <Link href="/terms"> Terms</Link></Checkbox>
                }} />
                {!!errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
                <Button size="sm" className="w-full" color="primary" variant="solid" type="submit">Sign Up</Button>
            </div>
        </form>
    )
}

export default RegisterForm;