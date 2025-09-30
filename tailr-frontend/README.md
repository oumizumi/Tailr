# Tailr Frontend (Skeleton)

Skeleton-only Next.js 15 (App Router) frontend with TypeScript and Tailwind v4. Integrates Supabase Auth (email + OAuth) and provides stubbed pages and API calls to the Tailr backend skeleton.

## Stack
- Next.js 15, TypeScript
- Tailwind CSS v4
- Supabase Auth (`@supabase/ssr`, `@supabase/supabase-js`)
- SWR (optional; stubs use server actions/fetch)

## Getting Started
1. Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
```
2. Install deps and run:
```
npm install
npm run dev
```
3. Visit `http://localhost:3000`.

## Auth
- Email/password and Google/GitHub OAuth supported via Supabase.
- Session persisted via `@supabase/ssr` cookies.
- Protected routes use server-side checks (`requireAuth`) and redirect to `/auth` if unauthenticated.

## Pages
- `/` Landing
- `/auth` Sign in/up (+ OAuth)
- `/profile` Profile form (mock, server action saves stub)
- `/job` Job input form (mock)
- `/tailor/[id]` Tailor page placeholder (fit score, requirements, artifacts)
- `/history` List mock tailored docs
- `/settings` Quotas and account (mock)

## API Layer (Stubbed)
`lib/api.ts` calls backend endpoints (`/profiles`, `/jobs`, `/tailor`, `/history`, `/limits`) with Authorization header if session exists, but returns mocked data when backend is unavailable.

## Notes
- No business logic beyond navigation and placeholders.
- No resume upload, exports, LLM calls, or cover letter features.

## Acceptance
- Login works; logout works.
- Navbar updates when logged in.
- Protected routes redirect to `/auth` when unauthenticated.
- Each page renders placeholder UI with Tailwind styling.
