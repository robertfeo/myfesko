import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ProfilePage = async () => {

    const session = await getServerSession(authOptions);
    const user = session?.user;

    return (
        <div className="flex flex-col gap-3 items-center">
            {session && user ? (
                <>
                    <h1>Profile</h1>
                    <p>First Name: {user.firstName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phoneNumber}</p>
                </>
            ) : (
                <h1>Not logged in</h1>
            )}
        </div>
    );
}

export default ProfilePage;