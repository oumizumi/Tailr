import { requireAuth } from "@/lib/auth";
import { getHistory } from "@/lib/api";
import Link from "next/link";

export default async function HistoryPage() {
  await requireAuth();
  const data = await getHistory(1, 20);
  return (
    <div className="grid gap-4">
      <h1 className="text-xl font-semibold">History</h1>
      <div className="grid gap-2">
        {data.items.map((it: any) => (
          <Link key={it.tailoredId} href={`/tailor/${it.tailoredId}`} className="rounded border bg-white p-4 hover:shadow">
            <div className="font-medium">{it.role} @ {it.company}</div>
            <div className="text-sm text-gray-600">Fit: {it.fitScore} • {new Date(it.createdAt).toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


