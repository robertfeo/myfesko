export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/profile/(.*)",
        "/admin/(.*)",
        "/",
        "/api/(.*)",
        "/chat/(.*)",
    ],
    redirect: true,
    redirectUrl: "/auth/login",
    redirectIfUnauthenticated: true,
    redirectIfAuthenticated: true,
    setReturnTo: true,
    baseUrl: "/",
    basePath: "/",
};