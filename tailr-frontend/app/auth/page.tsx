"use client";

import { useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = getSupabaseBrowserClient();

  async function onSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (!error) router.push("/");
  }

  async function onSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (!error) router.push("/");
  }

  async function oauth(provider: "google" | "github") {
    await supabase.auth.signInWithOAuth({ provider, options: { redirectTo: window.location.origin } });
  }

  return (
    <div className="max-w-md mx-auto grid gap-4">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <form className="grid gap-3" onSubmit={onSignIn}>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <Input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        <div className="flex gap-2">
          <Button disabled={loading} type="submit">Sign in</Button>
          <Button disabled={loading} type="button" variant="secondary" onClick={onSignUp}>Sign up</Button>
        </div>
      </form>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => oauth("google")}>Continue with Google</Button>
        <Button variant="secondary" onClick={() => oauth("github")}>GitHub</Button>
      </div>
    </div>
  );
}


