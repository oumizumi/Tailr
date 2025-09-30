import React from "react";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border bg-white shadow-sm p-4">{children}</div>;
}

export function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold mb-2">{children}</h3>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-gray-700 space-y-2">{children}</div>;
}


