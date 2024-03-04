export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/profile/:path*",
        "/admin/:path*",
        "/",
    ],
    redirect: true,
    redirectUrl: "/auth/login",
    redirectIfUnauthenticated: true,
    redirectIfAuthenticated: true,
    setReturnTo: true,
    baseUrl: "/",
};