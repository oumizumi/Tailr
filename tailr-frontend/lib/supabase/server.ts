import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function getSupabaseServerClient() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            // In Server Components this is readonly; in Route Handlers it works.
            (cookieStore as any).set?.({ name, value, ...options });
          } catch {}
        },
        remove(name: string, options: any) {
          try {
            (cookieStore as any).set?.({ name, value: "", ...options });
          } catch {}
        },
      },
    }
  );
  return supabase;
}


