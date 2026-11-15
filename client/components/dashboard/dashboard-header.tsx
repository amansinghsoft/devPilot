"use client";

import { Toggle } from "@base-ui/react";
import { Moon, RefreshCw, Search, Sun } from "lucide-react";
import { ModeToggle } from "../ui/mode-toggle";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
  onSync: () => void;
  syncing: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
  total: number;
  ready: number;
};

export function DashboardHeader({
  search, onSearchChange, onSync, syncing, isDark, onToggleTheme, total, ready,
}: Props) {
  return (
    <header className="rounded-t-3xl border-b border-border bg-background px-5 py-5 text-foreground transition-colors duration-300 sm:px-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200">
            <span className="text-xl">▤</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Repositories </h1>
            <p className="mt-0.5 text-sm text-muted-foreground"> {total} connected · {ready} ready </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="flex min-w-0 items-center gap-2 rounded-xl border border-input bg-card px-3.5 sm:w-[350px]">
            <Search className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search repositories..."
              className="h-10 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <button onClick={onSync} disabled={syncing} className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 text-sm font-semibold text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
            <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
            Sync
          </button>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </header>
  );
}
