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
            {result === "userNotExist" ? <h1>User does not exist</h1> :
                result === "alreadyActivated" ? <h3>Already activated</h3> :
                    result === "success" ? <h1>Success! Your account is now active.</h1> :
                        <h1>Something went wrong while activating your account.</h1>}
        </div>
    );
}

export default ActivationPage;