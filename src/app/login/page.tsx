import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import SocialLoginButtons from "./_components/social-login-buttons";

export default async function Login() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <h1 className="text-4xl text-white mb-4">Login</h1>
      <SocialLoginButtons />
    </div>
  );
}
