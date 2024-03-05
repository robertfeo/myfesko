"use client";

import { Button, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";

const ProfileMenu = () => {
    const { data: session } = useSession();

    return (
        <div className="flex items-center gap-2">
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
                        <PopoverContent className="w-[240px]">
                            <div className="px-1 py-2 w-full">
                                <div className="mt-2 flex flex-col gap-2 justify-center items-center">
                                    <p>Settings</p>
                                    <div className="flex flex-col gap-2 m-0 p-0">
                                        <Button className="w-full" size="sm" variant="light" href={"/profile"}>Profile</Button>
                                        <Button className="w-full" size="sm" variant="light" href={"/api/auth/signout"}>Log Out</Button>
                                    </div>
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
