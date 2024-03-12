
export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/profile/:path*",
        "/admin/:path*",
        "/",
        "/api/:path*",
        "/chat/:path*",
        "/settings/:path*",
        "/chat"
    ],
    redirect: true,
    redirectUrl: "/auth/login"
};