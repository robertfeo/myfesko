/* eslint-disable react/jsx-no-undef */
"use client";

import { ArrowLeftEndOnRectangleIcon, UserIcon } from "@heroicons/react/20/solid";
import { Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, User } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const iconClasses = "w-4 text-sm text-default-500 pointer-events-none flex-shrink-0";

    const handleProfile = () => {
        router.push("/profile");
    };

    const handleLogout = () => {
        router.push("/api/auth/signout");
    };

    return (
        <div className="mt-1">
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
                        <PopoverContent className="w-[200px] p-1">
                            {/* <DropdownMenu aria-label="Settings">
                                <DropdownItem onClick={handleProfile} variant="light" key="profile">Profile</DropdownItem>
                                <DropdownItem onClick={handleLogout} variant="light" key="logout">Log Out</DropdownItem>
                            </DropdownMenu> */}
                            <Listbox variant="faded">
                                <ListboxItem startContent={<UserIcon className={iconClasses} />} onClick={handleProfile} key="profile">Profile</ListboxItem>
                                <ListboxItem startContent={<ArrowLeftEndOnRectangleIcon className={iconClasses} />} onClick={handleLogout} key="logout">Log Out</ListboxItem>
                            </Listbox>
                        </PopoverContent>
                    </Popover>
                </>
            ) : (
                <>
                </>
            )
            }
        </div >
    );
}

export default ProfileMenu;
