"use client";

import { authClient } from "@/lib/auth-client";
import LoginButton from "./ui/login-button";
import { IoLogoGithub } from "react-icons/io5";

export default function SocialLoginButtons() {
  const signInGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex flex-col bg-gray-900">
      <LoginButton onClick={signInGithub}>
        <div className="flex items-center gap-2">
          <span>Sign in with GitHub</span> <IoLogoGithub />
        </div>
      </LoginButton>
    </div>
  );
}
