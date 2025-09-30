import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tailr",
  description: "Tailr frontend skeleton",
};

import Link from "next/link";
import { getSession } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const loggedIn = !!session;
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 text-gray-900`}>
        <header className="border-b bg-white">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-semibold">Tailr</Link>
              <Link href="/job">Job</Link>
              <Link href="/history">History</Link>
              {loggedIn && <Link href="/profile">Profile</Link>}
              {loggedIn && <Link href="/settings">Settings</Link>}
            </div>
            <div>
              {loggedIn ? (
                <form action="/auth/signout" method="post">
                  <button className="text-sm text-blue-600">Sign out</button>
                </form>
              ) : (
                <Link href="/auth" className="text-sm text-blue-600">Sign in</Link>
              )}
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
        <footer className="border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-500">© {new Date().getFullYear()} Tailr</div>
        </footer>
      </body>
    </html>
  );
}
