"use client";

import { useMemo, useState } from "react";
import { AlertCircle, FolderGit2, LoaderCircle } from "lucide-react";
import type { Repository } from "@/lib/api";
import { useRefreshRepos, useRepos } from "@/hooks/use-repos";
import { DashboardHeader } from "./dashboard-header";
import { RepoCard } from "./repo-card";

type Visibility = "ALL" | "PUBLIC" | "PRIVATE";
type StatusFilter = "ALL" | "READY" | "INDEXING" | "NEW" | "FAILED";

const visibilityFilters: { label: string; value: Visibility }[] = [
  { label: "All", value: "ALL" }, { label: "Public", value: "PUBLIC" }, { label: "Private", value: "PRIVATE" },
];
const statusFilters: { label: string; value: StatusFilter }[] = [
  { label: "All", value: "ALL" }, { label: "Ready", value: "READY" }, { label: "Indexing", value: "INDEXING" },
  { label: "New", value: "NEW" }, { label: "Failed", value: "FAILED" },
];

function FilterPill<T extends string>({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} aria-pressed={active} className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
      active ? "border-white bg-white text-zinc-950" : "border-dashed border-white/15 bg-white/[0.025] text-zinc-400 hover:border-white/30 hover:text-zinc-100"
    }`}>{label}</button>
  );
}

function matchesStatus(repo: Repository, filter: StatusFilter) {
  if (filter === "ALL") return true;
  if (filter === "READY") return repo.indexStatus === "READY";
  if (filter === "INDEXING") return repo.indexStatus === "INDEXING";
  if (filter === "FAILED") return repo.indexStatus === "FAILED";
  return repo.indexStatus === "PENDING";
}

export function RepoDashboard() {
  const reposQuery = useRepos();
  const refreshMutation = useRefreshRepos();
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState<Visibility>("ALL");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [isDark, setIsDark] = useState(true);

  const repos = reposQuery.data ?? [];
  const readyCount = repos.filter((repo) => repo.indexStatus === "READY").length;
  const filteredRepos = useMemo(() => repos.filter((repo) => {
    const term = search.trim().toLowerCase();
    const matchesSearch = !term || [repo.name, repo.fullName, repo.owner, repo.description ?? "", repo.language ?? ""]
      .some((value) => value.toLowerCase().includes(term));
    const matchesVisibility = visibility === "ALL" || (visibility === "PRIVATE" ? repo.isPrivate : !repo.isPrivate);
    return matchesSearch && matchesVisibility && matchesStatus(repo, status);
  }), [repos, search, visibility, status]);

  return (
    <main className="min-h-screen rounded-t-3xl bg-background text-foreground transition-colors duration-300">
    <div className={ isDark ? "" : "[&_header]:border-zinc-200 [&_h1]:text-zinc-950 [&_h2]:text-zinc-950 [&_p]:text-zinc-600 [&_label]:border-zinc-300 [&_input]:text-zinc-950" } >
        <DashboardHeader
          search={search} onSearchChange={setSearch}
          onSync={() => refreshMutation.mutate()}
          syncing={refreshMutation.isPending}
          isDark={isDark} onToggleTheme={() => setIsDark((value) => !value)}
          total={repos.length} ready={readyCount}
        />

        <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-zinc-400">Visibility</span>
            {visibilityFilters.map((item) => <FilterPill key={item.value} label={item.label} active={visibility === item.value} onClick={() => setVisibility(item.value)} />)}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold text-zinc-400">Status</span>
            {statusFilters.map((item) => <FilterPill key={item.value} label={item.label} active={status === item.value} onClick={() => setStatus(item.value)} />)}
          </div>
        </div>

        <section className="px-5 py-7 sm:px-8">
          {reposQuery.isPending ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-zinc-400">
              <LoaderCircle className="h-5 w-5 animate-spin" /> Loading repositories...
            </div>
          ) : reposQuery.isError ? (
            <div className="mx-auto flex max-w-xl flex-col items-center rounded-2xl border border-red-500/20 bg-red-500/[0.05] p-8 text-center">
              <AlertCircle className="mb-3 h-8 w-8 text-red-300" />
              <h2 className="font-semibold text-white">Could not load repositories</h2>
              <p className="mt-2 text-sm text-zinc-400">{reposQuery.error.message}</p>
              <button onClick={() => void reposQuery.refetch()} className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/15">Try again</button>
            </div>
          ) : filteredRepos.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center text-center">
              <FolderGit2 className="h-10 w-10 text-zinc-600" />
              <h2 className="mt-4 text-lg font-semibold text-white">{repos.length ? "No matching repositories" : "No repositories found"}</h2>
              <p className="mt-1 max-w-md text-sm text-zinc-400">{repos.length ? "Try changing your search or filters." : "Sync your GitHub repositories to get started."}</p>
              {!repos.length && <button onClick={() => refreshMutation.mutate()} className="mt-4 rounded-lg bg-pink-700 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600">Sync repositories</button>}
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
                <span>{filteredRepos.length} repositories</span>
                {reposQuery.isFetching && <span className="inline-flex items-center gap-1.5"><LoaderCircle className="h-3.5 w-3.5 animate-spin" /> Updating</span>}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
