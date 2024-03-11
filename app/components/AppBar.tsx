/* eslint-disable react/jsx-no-undef */
/* 'use server'; */
"use client";

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import { MyFeskoLogo } from "./MyFeskoLogo";
import { ThemeSwitcher } from "./ThemeSwitcher";

const AppBar = () => {
    return (
        <Navbar isBlurred shouldHideOnScroll>
            <NavbarContent>
                <NavbarBrand>
                    <MyFeskoLogo />
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link className="hover:text-sky-500 transition duration-300 ease-in-out" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className="hover:text-sky-500 transition duration-300 ease-in-out" href="/chat">
                        Chat
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent as="div" justify="end">
                <NavbarItem className="flex flex-row justify-center gap-3">
                    <ThemeSwitcher />
                    <LoginButton />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}

export default AppBar;