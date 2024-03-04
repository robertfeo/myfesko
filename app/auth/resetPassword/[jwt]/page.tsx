import ResetPasswordForm from "@/app/components/ResetPasswordForm"

interface ResetPasswordPageProps {
    params: {
        jwt: string
    }
}

const ResetPasswordPage = ({ params }: ResetPasswordPageProps) => {
    return (
        <div>
            <ResetPasswordForm jwtUserID={params.jwt} />
        </div>
    )
}

export default ResetPasswordPage