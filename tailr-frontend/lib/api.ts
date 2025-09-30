import { getSession } from "@/lib/auth";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

async function authHeaders() {
  try {
    const session = await getSession();
    if (session?.access_token) {
      return { Authorization: `Bearer ${session.access_token}` };
    }
  } catch {}
  return {} as Record<string, string>;
}

export async function getLimits() {
  try {
    const res = await fetch(`${BACKEND}/limits`, { headers: await authHeaders() });
    if (res.ok) return res.json();
  } catch {}
  return { remainingToday: 3, plan: "free" };
}

export async function getProfile() {
  try {
    const res = await fetch(`${BACKEND}/profiles/me`, { headers: await authHeaders() });
    if (res.ok) return res.json();
  } catch {}
  return { id: "me", email: "demo@tailr.app", headline: "", summary: "", skills: [] };
}

export async function upsertProfile(input: any) {
  try {
    const res = await fetch(`${BACKEND}/profiles`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify(input),
    });
    if (res.ok) return res.json();
  } catch {}
  return { ...input, id: "me", email: "demo@tailr.app" };
}

export async function ingestResume(input: { filename: string; size: number; mime: string }) {
  try {
    const res = await fetch(`${BACKEND}/profiles/ingest-resume`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify(input),
    });
    if (res.ok) return res.json();
  } catch {}
  return { resumeId: "uuid", uploadUrl: "TBD", message: "stub" };
}

export async function createJob(input: { role: string; company: string; jdRaw?: string; sourceUrl?: string }) {
  try {
    const res = await fetch(`${BACKEND}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify(input),
    });
    if (res.ok) return res.json();
  } catch {}
  return { jobTargetId: "uuid", researchStatus: "queued" };
}

export async function getJobById(id: string) {
  try {
    const res = await fetch(`${BACKEND}/jobs/${id}`, { headers: await authHeaders() });
    if (res.ok) return res.json();
  } catch {}
  return { id, role: "Backend SWE", company: "Acme", jdRaw: "", sourceUrl: null, research: {} };
}

export async function tailor(input: { jobTargetId: string }) {
  try {
    const res = await fetch(`${BACKEND}/tailor`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(await authHeaders()) },
      body: JSON.stringify(input),
    });
    if (res.ok) return res.json();
  } catch {}
  return {
    tailoredId: "uuid",
    fitScore: 0,
    strengths: [],
    gaps: [],
    requirements: { mustHave: [], niceToHave: [], responsibilities: [] },
    artifacts: { docxUrl: null, pdfUrl: null },
    diagnostics: { coverageMap: [], atsFlags: [], rewriteDiffs: [] },
  };
}

export async function getTailoredById(id: string) {
  try {
    const res = await fetch(`${BACKEND}/tailored/${id}`, { headers: await authHeaders() });
    if (res.ok) return res.json();
  } catch {}
  return {
    tailoredId: id,
    fitScore: 0,
    strengths: [],
    gaps: [],
    requirements: { mustHave: [], niceToHave: [], responsibilities: [] },
    artifacts: { docxUrl: null, pdfUrl: null },
    diagnostics: { coverageMap: [], atsFlags: [], rewriteDiffs: [] },
  };
}

export async function getHistory(page = 1, pageSize = 20) {
  try {
    const url = new URL(`${BACKEND}/history`);
    url.searchParams.set("page", String(page));
    url.searchParams.set("pageSize", String(pageSize));
    const res = await fetch(url.toString(), { headers: await authHeaders() });
    if (res.ok) return res.json();
  } catch {}
  return {
    items: [
      { tailoredId: "uuid", role: "Backend SWE", company: "Acme", fitScore: 0, createdAt: new Date().toISOString(), docxUrl: null, pdfUrl: null },
    ],
    page,
    pageSize,
    total: 0,
  };
}


