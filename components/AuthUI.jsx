"use client";
import React, { use, useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createSupabaseBrowserClient } from "@/lib/client/supabase";
import useHydrate from "@/hooks/useHydrate";

const AuthUI = () => {
  const [user, setUser] = useState();
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();

  const getUserInfo = async () => {
    const result = await supabase.auth.getUser();
    console.log("result", result);
    if (result?.data?.user) {
      setUser(result?.data?.user);
    } //if
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  // 구글 로그인 버튼 커스텀용
  const handleGoogleLogin = async () => {
    await supabase.auth.signIn({
      provider: "google",
      options: { redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO },
    });
  };

  // 깃허브 로그인 버튼 커스텀용
  const handleGithubLogin = async () => {
    await supabase.auth.signIn({
      provider: "github",
      options: { redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO },
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!isMount) return null;

  return (
    <section className="w-full p-10">
      <div>{user ? `로그인 됨 ${user?.email}` : "로그아웃"}</div>
      <>
        {user && (
          <button onClick={handleLogout} className="border-2 border-black">
            로그아웃
          </button>
        )}
      </>
      <div className="mx-auto max-w-[500px]">
        <Auth
          redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders
          providers={["google", "github"]}
        />
      </div>
    </section>
  );
};

export default AuthUI;
