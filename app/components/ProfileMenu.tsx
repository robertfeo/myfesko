/* eslint-disable react/jsx-no-undef */
"use client";

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const ProfileMenu = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const handleSettings = () => {
        if (session?.user) {
            router.push(`/settings`);
        }
    };

    async function handleLogout() {
        signOut();
    };

    return (
        <div>
            {session && session.user ? (
                <>
                    <Dropdown placement="bottom-end" backdrop="blur">
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                className="transition-transform shadow-md shadow-green-900/20"
                                color="success"
                                name={`${session.user.firstname} ${session.user.lastname}`}
                                size="sm"
                                src={`${session.user.image!}` || "https://via.placeholder.com/150"}
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Profile Actions" variant="flat">
                            <DropdownItem key="profile" className="h-14 gap-2" >
                                <p className="font-semibold">Logged in as</p>
                                <p className="font-semibold">{session.user.email}</p>
                            </DropdownItem>
                            <DropdownItem key="settings" onClick={handleSettings}>My Settings</DropdownItem>
                            <DropdownItem textValue="" key="logout" onClick={handleLogout} color="danger">
                                Log Out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
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
