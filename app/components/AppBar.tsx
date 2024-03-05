/* eslint-disable react/jsx-no-undef */
/* 'use server'; */
"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { MyFeskoLogo } from "./MyFeskoLogo";

const AppBar = () => {

    return (
        <Navbar isBordered>
            <NavbarContent>
                <NavbarBrand>
                    <MyFeskoLogo />
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link className="hover:text-sky-500" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="hover:text-sky-500" href="/chat">
                        Chat
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                    <LoginButton />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default AppBar;