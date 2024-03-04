import ResetPasswordForm from "@/app/components/ResetPasswordForm"
import { verifyJWT } from "@/lib/jwt"

interface ResetPasswordPageProps {
    params: {
        jwt: string
    }
}

const ResetPasswordPage = ({ params }: ResetPasswordPageProps) => {

    try {
        const payload = verifyJWT(params.jwt)
        if (!payload) {
            return (
                <div className="flex flex-col items-center justify-center">
                    <h1>Invalid or expired token</h1>
                </div>
            )
        }
    } catch (error) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1>Invalid or expired token</h1>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <ResetPasswordForm className="m-10 flex flex-col items-center w-150" jwtUserID={params.jwt} />
        </div>
    )
}

export default ResetPasswordPage