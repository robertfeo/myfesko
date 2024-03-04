import LoginForm from "@/app/components/LoginForm";

interface Props {
    searchParams: {
        callbackUrl?: string;
    };
}

const LoginPage = ({ searchParams }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <LoginForm callbackUrl={searchParams.callbackUrl} className="w-full max-w-md mt-20" />
        </div>
    )
}

export default LoginPage;