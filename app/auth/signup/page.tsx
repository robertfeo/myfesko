import RegisterForm from "@/app/components/RegisterForm";
import { Link } from "@nextui-org/react";

const SignUpPage = () => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row gap-5 mt-10">
                <RegisterForm />
                <div className="border h-10 rounded-lg bg-zinc-100 mt-5 p-10 md:col-span-2 flex justify-center items-center">
                    <p className="text-center p-2">Already signed up?</p>
                    <Link href={"/auth/login"}>Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;