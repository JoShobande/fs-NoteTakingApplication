// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // you can pass options here if you need them
  {
    pages: {
      // where to send users who aren’t signed in
      signIn: "/signin",
    },
  }
);

export const config = {
  // run this middleware on /notes and everything beneath it
  matcher: ["/notes/:path*"],
};
