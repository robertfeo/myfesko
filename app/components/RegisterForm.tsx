"use client";
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, PhoneIcon, UserIcon } from "@heroicons/react/16/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import validator from "validator";
import { z } from "zod";

const FormSchema = z.object({
    firstName: z.string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(45, "First Name must be at most 45 characters long.")
        .regex(new RegExp("^[a-ZA-Z+$"), "No special characters allowed!"),
    lastName: z.string()
        .min(2, "First Name must be at least 2 characters long.")
        .max(45, "First Name must be at most 45 characters long.")
        .regex(new RegExp("^[a-ZA-Z+$"), "No special characters allowed!"),
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

const RegisterForm = () => {
    const [isVisiblePass, setIsVisiblePass] = useState(false)
    const toggleVisiblePass = () => setIsVisiblePass(prev => !prev)
    return (
        <form className="grid grid-cols-2 gap-3 p-5 justify-center items-center">
            <Input label="First Name" startContent={<UserIcon className="w-4"></UserIcon>}></Input>
            <Input label="Last Name" startContent={<UserIcon className="w-4"></UserIcon>}></Input>
            <Input className="col-span-2" type="email" label="Email" startContent={<EnvelopeIcon className="w-4"></EnvelopeIcon>}></Input>
            <Input className="col-span-2" type="phone" label="Phone" startContent={<PhoneIcon className="w-4"></PhoneIcon>}></Input>
            <Input className="col-span-2" type={isVisiblePass ? "text" : "password"} label="Password" startContent={<LockClosedIcon className="w-4" />}
                endContent={
                    isVisiblePass ? (<EyeIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}></EyeIcon>) : (<EyeSlashIcon className="w-4 cursor-pointer" onClick={toggleVisiblePass}></EyeSlashIcon>)
                }>
            </Input>
            <Input className="col-span-2" type="password" label="Confirm Password" startContent={<LockClosedIcon className="w-4" />}></Input>
            <div className="flex flex-col col-span-2 justify-center items-center gap-3">
                <Checkbox>I Accept The <Link href="/terms"> Terms</Link></Checkbox>
                <Button className="w-40" color="primary" variant="solid" type="submit">Sign Up</Button>
            </div>
        </form>
    )
}

export default RegisterForm;