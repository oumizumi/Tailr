import { requireAuth } from "@/lib/auth";
import { getLimits } from "@/lib/api";

export default async function SettingsPage() {
  await requireAuth();
  const limits = await getLimits();
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">Settings</h1>
      <div className="rounded border bg-white p-4">
        <div className="text-sm text-gray-700">Plan: {limits.plan}</div>
        <div className="text-sm text-gray-700">Remaining today: {limits.remainingToday}</div>
      </div>
      <div className="rounded border bg-white p-4 text-sm text-gray-600">Delete account (stubbed)</div>
    </div>
  );
}


