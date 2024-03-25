/* eslint-disable react/jsx-no-undef */
"use client";
import { Avatar } from "@nextui-org/react";
import { User } from "@prisma/client";

interface ChatUserProfileProps {
    className: string;
    user: User;
}

const ChatRooms = ({ className, user }: ChatUserProfileProps) => {
    return (
        <>
            {user ? (
                <div className={`${className}`}>
                    <div className="flex flex-col items-center gap-4">
                        <Avatar src={user.image || `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}`} size="md" />
                        <h1>{user.firstname}</h1>
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

export default ChatRooms;