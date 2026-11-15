"use client";

import Link from "next/link";
import {
  AlertCircle, ArrowRight, ExternalLink, GitBranch, LoaderCircle,
  MessageSquare, Sparkles,
} from "lucide-react";
import type { Repository } from "@/lib/api";
import { getRepoProgress, useStartIndexing } from "@/hooks/use-repos";
import { LanguageBadge } from "./language-badge";
import { IndexErrorAlert } from "./index-error-alert";

function statusLabel(status: Repository["indexStatus"]) {
  switch (status) {
    case "READY": return "Ready";
    case "INDEXING": return "Indexing";
    case "PENDING": return "Not indexed";
    case "FAILED": return "Failed";
  }
}

function LanguageIcon({ language }: { language: string | null }) {
  const key = language?.toLowerCase() ?? "";

  if (key.includes("python"))
    return <span className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500 text-lg">🐍</span>;

  if (key.includes("javascript") || key.includes("typescript"))
    return <span className="grid h-10 w-10 place-items-center rounded-xl bg-yellow-400 text-sm font-black text-zinc-950">JS</span>;

  if (key.includes("html"))
    return <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-600 text-sm font-black text-white">5</span>;

  if (key.includes("java"))
    return <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500 text-lg">☕</span>;

  return (
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-fuchsia-600 text-white">
      <GitBranch className="h-5 w-5" />
    </span>
  );
}

export function RepoCard({ repo }: { repo: Repository }) {
  const indexMutation = useStartIndexing();
  const ready = repo.indexStatus === "READY";
  const indexing = repo.indexStatus === "INDEXING";
  const failed = repo.indexStatus === "FAILED";
  const progress = getRepoProgress(repo);

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-border bg-card text-card-foreground shadow-sm transition-colors duration-300 hover:border-ring/50">
      {/* Repository header */}
      <div className="flex min-h-[90px] items-start gap-3 border-b border-dashed border-border px-4 py-4 sm:px-5">
        <LanguageIcon language={repo.language} />

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="truncate text-sm text-muted-foreground">{repo.owner}</p>
          <h2
            className="mt-0.5 truncate text-lg font-semibold leading-6 text-card-foreground"
            title={repo.name}
          >
            {repo.name || "Unnamed repository"}
          </h2>
        </div>

        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            ready
              ? "border-pink-500/30 bg-pink-600 text-white"
              : failed
                ? "border-red-500/25 bg-red-500/10 text-red-600 dark:text-red-300"
                : indexing
                  ? "border-blue-400/25 bg-blue-400/10 text-blue-700 dark:text-blue-200"
                  : "border-border bg-muted text-muted-foreground"
          }`}
        >
          {statusLabel(repo.indexStatus)}
        </span>
      </div>

      {/* Repository details */}
      <div className="flex-1 px-4 py-4 sm:px-5">
        {repo.errorMessage && failed ? (
          <IndexErrorAlert message={repo.errorMessage} />
        ) : null}

        <p className="min-h-6 break-words text-sm text-muted-foreground">
          {repo.description || "No description provided."}
        </p>

        {indexing && (
          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-xs text-muted-foreground">
              <span>Indexing files</span>
              <span>{repo.filesProcessed}/{repo.filesTotal}</span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-pink-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground">
            <GitBranch className="h-3.5 w-3.5" />
            {repo.defaultBranch || "main"}
          </span>

          <LanguageBadge language={repo.language} />

          {ready && (
            <span className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
              {repo.chunkCount} chunks
            </span>
          )}
        </div>
      </div>

      {/* Repository footer */}
      <footer className="flex min-h-[64px] items-center justify-between gap-2 border-t border-dashed border-border px-4 py-3 sm:px-5">
        {repo.htmlUrl ? (
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-primary"
          >
            <ExternalLink className="h-4 w-4" />
            GitHub
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            GitHub
          </span>
        )}

        <div className="flex items-center gap-2">
          {ready && (
            <Link
              // href={`/chat?repoId=${encodeURIComponent(repo.id)}`}
              href={`/chat/${encodeURIComponent(repo.id)}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Link>
          )}

          {ready ? (
            <Link
              href={`/dashboard/repos/${repo.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg bg-pink-700 px-3 py-2 text-xs font-semibold text-white hover:bg-pink-600"
            >
              Open <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              disabled={indexMutation.isPending || indexing}
              onClick={() => indexMutation.mutate(repo.id)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-pink-700 px-3 py-2 text-xs font-semibold text-white hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {indexing || indexMutation.isPending ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : failed ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {failed ? "Retry" : indexing ? "Indexing" : "Index"}
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}