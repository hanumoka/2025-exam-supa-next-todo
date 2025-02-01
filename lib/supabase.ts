import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next";

// - ServerActions, RouterHandler 용 supabase server client 를 생성하는 함수(next.js 에서 각 서버 구성요소마다 cookie 사용방식의 차이가 있으므로)
export const createServerSideClient = async (serverComponent = false) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (serverComponent) {
            return;
          }
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          if (serverComponent) {
            return;
          }
          cookieStore.set(key, "", options);
        },
      },
    }
  );
};

// - RSC 용 supabase server client 를 생성하는 함수(next.js 서버 구성요소중 RSC는 cookie를 사용할수 없다.)
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// - Middleware 용 supabase server client 를 생성하는 함수
export const createServerSideMiddleware = async (
  req: NextRequest,
  res: NextResponse
) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, { req, res }),
        set: (key, value, options) => {
          setCookie(key, value, { req, res, ...options });
        },
        remove: (key, options) => {
          setCookie(key, "", { req, res, ...options });
        },
      },
    }
  );
};
