import React from "react";

export function Progress({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full">
      <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
    </div>
  );
}


