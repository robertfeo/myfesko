
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
    redirectUrl: "/auth/login"
};

/* export async function middleware(request: NextRequest) {
	const token = await getToken({ req: request });
	if (!token && process.env.NEXTAUTH_URL) {
		return NextResponse.redirect(process.env.NEXTAUTH_URL);
	}
} */