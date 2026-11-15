"use client";

import { Code2, FileCode2 } from "lucide-react";

const styles: Record<string, string> = {
  javascript:
    "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:border-yellow-400/30 dark:bg-yellow-400/10 dark:text-yellow-300",
  typescript:
    "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-300",
  java:
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300",
  python:
    "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:border-sky-400/30 dark:bg-sky-400/10 dark:text-sky-300",
  html:
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-300",
  css:
    "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-300",
  "jupyter notebook":
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300",
};

export function LanguageBadge({ language }: { language: string | null }) {
  if (!language) return null;

  const key = language.toLowerCase();
  const style =
    styles[key] ??
    "border-border bg-muted text-muted-foreground";

  const Icon = key === "jupyter notebook" ? FileCode2 : Code2;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors duration-300 ${style}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {language}
    </span>
  );
}