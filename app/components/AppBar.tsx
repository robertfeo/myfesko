import { Button, Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react";

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
                {/* <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem> */}
                <NavbarItem>
                    <Button as={Link} color="primary" href="/auth/signup" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>

    );
}

export default AppBar;