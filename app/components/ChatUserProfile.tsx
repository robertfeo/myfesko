/* eslint-disable react/jsx-no-undef */
"use client";
import { formatDate } from "@/lib/utils/dateFormat";
import { Avatar } from "@nextui-org/react";
import { User } from "@prisma/client";

interface ChatUserProfileProps {
    className: string;
    user: User;
}

const ChatUserProfile = ({ className, user }: ChatUserProfileProps) => {
    return (
        <>
            {user ? (
                <div className={`${className}`}>
                    <div className="flex flex-col items-center gap-4 m-2 rounded-2xl">
                        <div className="flex flex-col items-center gap-2 m-2">
                            <Avatar src={user.image! || `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}?background=random`}
                                alt="User profile"
                                className="w-20 h-20 text-large" />
                            <h1 className="text-xl font-bold">{user.firstname} {user.lastname}</h1>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm">Email: {user.email}</p>
                            <p className="text-sm">Joined: {formatDate(user.emailVerified!)}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <h1>Please sign in to chat</h1>
                </div>
            )}
        </>
    );
}

export default ChatUserProfile;