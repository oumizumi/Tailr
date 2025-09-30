import React from "react";

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">{children}</span>;
}


