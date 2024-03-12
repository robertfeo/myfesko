import { Image } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const ProfilePage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="flex flex-col gap-3 items-center">
            {session && session.user ? (
                <>
                    <h1>Profile</h1>
                    <Image
                        width={300}
                        alt="Profile Picture"
                        src={session.user.image!}
                    />
                    <p>First Name: {session.user.firstname}</p>
                    <p>Email: {session.user.email}</p>
                    <p>Phone: {session.user.phoneNumber}</p>
                    <p>{session.user.id}</p>
                </>
            ) : (
                <h1>Not logged in</h1>
            )}
        </div>
    );
}

export default ProfilePage;