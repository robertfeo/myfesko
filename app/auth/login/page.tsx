import LoginForm from "@/app/components/LoginForm";
import { Link } from "@nextui-org/react";

interface Props {
    searchParams: {
        callbackUrl?: string;
    };
}

const LoginPage = ({ searchParams }: Props) => {
    console.log({ searchParams });
    return (
        <div className="flex justify-center items-center">
            <LoginForm callbackUrl={searchParams.callbackUrl} />
            <Link href={"auth/forgotPass"}>Forgot password</Link>
        </div>
    )
}

export default LoginPage;