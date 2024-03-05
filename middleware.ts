export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/profile/:path*",
        "/admin/:path*",
        "/",
        "/api/:path*",
        "/chat/:path*",
    ],
    redirect: true,
    redirectUrl: "/auth/login",
    redirectIfUnauthenticated: true,
    redirectIfAuthenticated: true,
    redirectTo: "/",
};