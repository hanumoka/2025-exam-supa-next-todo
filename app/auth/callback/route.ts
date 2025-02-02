import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const ovverrideOrigin = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME;

  const { searchParams, origin } = new URL(request.url);
  console.log(">> searchParams", searchParams);
  console.log(">> origin", origin);

  const code = searchParams.get("code");
  const next = searchParams.get("next");

  console.log(">> code", code);
  console.log(">> next", next);

  if (code) {
    const supabase = await createServerSideClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code); // 실제 토큰 교환

    if (error) {
      return NextResponse.redirect(`${ovverrideOrigin}`);
    } //if

    return NextResponse.redirect(`${ovverrideOrigin}${next}`);
  } //if

  return NextResponse.redirect(`${ovverrideOrigin}`);
}
