// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInPage from "./signin/page";
import { authOptions } from "./api/auth/[...nextauth]/options";

export default async function RootPage() {
  // 1. Server‐side session check
  const session = await getServerSession(authOptions);

  // 2. If no session, show the Sign In page UI
  if (!session) {
    return <SignInPage />;
  }

  // 3. If the user *is* signed in, send them to /notes
  redirect("/notes");
}
