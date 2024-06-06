import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const url = req.nextUrl.clone();
    if (req.nextauth.token) {
      if (url.pathname === "/" || url.pathname === "/auth") {
        url.pathname = "/home";
        return NextResponse.redirect(url);
      }
    }
  },
  {
    pages: {
      signIn: "/auth",
      error: "/error",
      newUser: "/home",
    },
  }
);

export const config = {
  matcher: ["/((?!public|images|media|terms).*)", "/auth"],
};
