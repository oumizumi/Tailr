import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function getSession() {
  const supabase = await getSupabaseServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session ?? null;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    redirect("/auth");
  }
  return session;
}


