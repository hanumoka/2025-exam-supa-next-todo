import { createBrowserClient } from "@supabase/ssr"; // client 사이드에서 supabase api 를 호출할때 사용할 수 있는 함수를 import
import { Database } from "@/types/supabase";

export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
