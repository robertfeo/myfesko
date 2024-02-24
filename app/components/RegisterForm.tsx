"use client";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import validator from "validator";
import { z } from "zod";

const FormSchema = z.object({
    firstName: z.string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(45, "First Name must be at most 45 characters long.")
        .regex(new RegExp("^[a-zA-Z+]+$"), "No special characters allowed!"),
    lastName: z.string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(45, "First Name must be at most 45 characters long.")
        .regex(new RegExp("^[a-zA-Z+]+$"), "No special characters allowed!"),
    email: z.string().email("Please enter a valid email address."),
    phone: z.string().refine(validator.isMobilePhone, "Please enter a valid phone number."),
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
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    const [isVisiblePass, setIsVisiblePass] = useState(false)
    const toggleVisiblePass = () => setIsVisiblePass(prev => !prev)

    const saveUser: SubmitHandler<InputType> = async (data) => {
        console.log({ data })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(saveUser)} className="grid grid-cols-2 gap-3 p-5 justify-center items-center">
            <Input errorMessage={errors.firstName?.message} isInvalid={!!errors.firstName} {...register("firstName")} label="First Name" startContent={<UserIcon className="w-4"></UserIcon>}></Input>
            <Input errorMessage={errors.lastName?.message} isInvalid={!!errors.lastName} {...register("lastName")} label="Last Name" startContent={<UserIcon className="w-4"></UserIcon>}></Input>
            <Input errorMessage={errors.email?.message} isInvalid={!!errors.email} {...register("email")} className="col-span-2" type="email" label="Email" startContent={<EnvelopeIcon className="w-4"></EnvelopeIcon>}></Input>
            <Input errorMessage={errors.phone?.message} isInvalid={!!errors.phone} {...register("phone")} className="col-span-2" type="phone" label="Phone" startContent={<PhoneIcon className="w-4"></PhoneIcon>}></Input>
            <Input errorMessage={errors.password?.message} isInvalid={!!errors.password} {...register("password")} className="col-span-2" type={isVisiblePass ? "text" : "password"} label="Password" startContent={<LockClosedIcon className="w-4" />}
                endContent={
                    isVisiblePass ? (<EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}></EyeIcon>) : (<EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}></EyeSlashIcon>)
                }>
            </Input>
            <Input errorMessage={errors.confirmPassword?.message} isInvalid={!!errors.confirmPassword} {...register("confirmPassword")} className="col-span-2" type="password" label="Confirm Password" startContent={<LockClosedIcon className="w-4" />}></Input>
            <div className="flex flex-col col-span-2 justify-center items-center gap-3">
                <Controller control={control} name="acceptedTerms" render={({ field }) => {
                    return <Checkbox onChange={field.onChange} onBlur={field.onBlur}>I Accept The <Link href="/terms"> Terms</Link></Checkbox>
                }} />
                {!!errors.acceptedTerms && <p className="text-red-500 text-sm">{errors.acceptedTerms.message}</p>}
                <Button className="w-40" color="primary" variant="solid" type="submit">Sign Up</Button>
            </div>
        </form>
    )
}

export default RegisterForm;