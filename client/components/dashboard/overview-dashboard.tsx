"use client";

import { useRepos } from "@/hooks/use-repos";

export function OverviewDashboard() {
  const { data = [], isPending } = useRepos();

  const ready = data.filter((repo) => repo.indexStatus === "READY").length;
  const indexing = data.filter((repo) => repo.indexStatus === "INDEXING").length;
  const failed = data.filter((repo) => repo.indexStatus === "FAILED").length;

  const stats = [
    { label: "Connected repositories", value: data.length },
    { label: "Ready to chat", value: ready },
    { label: "Currently indexing", value: indexing },
    { label: "Failed indexing", value: failed },
  ];

  return (
    <main className="min-h-screen rounded-t-3xl bg-background px-5 py-8 text-foreground transition-colors duration-300 sm:px-8">
      <h1 className="text-2xl font-bold tracking-tight">
        Workspace overview
      </h1>

      <p className="mt-1 text-sm text-muted-foreground">
        A quick look at your connected GitHub workspace.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm transition-colors duration-300"
          >
            <p className="text-sm text-muted-foreground">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold">
              {isPending ? "—" : stat.value}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}