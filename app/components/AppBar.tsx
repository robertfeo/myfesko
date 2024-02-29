'use server';

import { Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";
import LoginButton from "./LoginButton";

const AppBar = () => {
    return (
        <Navbar isBordered>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
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