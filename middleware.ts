import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
    return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // jika token ada, user diizinkan
        },
    }
);

// Hanya proteksi path ini (harus login)
export const config = {
    matcher: [
        "/dashboard/:path*", 
        "/status-gizi/:path*", 
        "/menu/:path*", 
        "/(pages)/(auth)/data-diri/:path*"
    ],
};
