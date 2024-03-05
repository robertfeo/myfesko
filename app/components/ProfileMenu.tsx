"use client";

import { Button, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleProfile = () => {
        router.push("/profile");
    };

    const handleLogout = () => {
        router.push("/api/auth/signout");
    };

    return (
        <div className="">
            {session && session.user ? (
                <>
                    <Popover placement="bottom" showArrow offset={10}>
                        <PopoverTrigger>
                            <User
                                as="button"
                                name={`${session.user.firstName} ${session.user.lastName}`}
                                description={`${session.user.email}`}
                                className="transition-transform"
                                avatarProps={{ src: `${session.user.image}` }}
                            />
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px]">
                            <div className="">
                                <p>Settings</p>
                                <div className="">
                                    <Button onClick={handleProfile} size="sm" variant="light">Profile</Button>
                                    <Button onClick={handleLogout} size="sm" variant="light">Log Out</Button>
                                    <button ></button>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </>
            ) : (
                <>
                </>
            )}
        </div>
    );
}

export default ProfileMenu;
