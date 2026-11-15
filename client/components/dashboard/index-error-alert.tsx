"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export function IndexErrorAlert({ message }: { message: string }) {
  const [visible, setVisible] = useState(true);

  if (!visible || !message) return null;

  return (
    <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-800 transition-colors duration-300 dark:border-red-500/25 dark:bg-red-500/[0.08] dark:text-red-200">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

      <p className="min-w-0 flex-1">{message}</p>

      <button
        type="button"
        aria-label="Dismiss error"
        onClick={() => setVisible(false)}
        className="rounded p-1 transition-colors hover:bg-red-200/70 dark:hover:bg-white/10"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}