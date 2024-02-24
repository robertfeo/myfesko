import RegisterForm from "@/app/components/RegisterForm";
import { Link } from "@nextui-org/react";

const SignUpPage = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            <div className="md:col-span-2 flex justify-center items-center">
                <p className="text-center p-2">Already signed up?</p>
                <Link href={"/auth/login"}>Log In</Link>
            </div>
            <RegisterForm />
        </div>
    );
}

export default SignUpPage;