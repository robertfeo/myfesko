import { activateUser } from "@/lib/actions/authActions";

interface Props {
    params: {
        jwt: string;
    };
}

const ActivationPage = async ({ params }: Props) => {

    const result = await activateUser(params.jwt);
    return (
        <div className="mt-10 flex flex-col items-center justify-center">
            {result === "userNotExist" ? <p className="text-2xl text-red-500 text-center">User does not exist</p> :
                result === "alreadyActivated" ? <p className="text-2xl text-emerald-500 text-center">Already activated</p> :
                    result === "success" ? <p className="text-2xl text-emerald-500 text-center">Success! Your account is now active.</p> :
                        <h1>Something went wrong while activating your account.</h1>}
        </div>
    );
}

export default ActivationPage;