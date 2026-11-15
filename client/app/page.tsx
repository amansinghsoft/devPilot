import Link from "next/link";
import { ArrowRight, FolderGit2, MessageSquareCode, Sparkles } from "lucide-react";

import { DevPilotIcon } from "@/components/icons/devpilot-icon";
import { BrandMark } from "@/components/layout/app-shell";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { getGithubLoginUrl } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="relative min-h-svh overflow-hidden">
     <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-fuchsia-950/20 via-background to-background" />
        <header className="relative z-10 mx-auto flex h-14 w-full max-w-5xl items-center justify-between">
          <BrandMark />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Link 
              href="/login"
              className={cn(buttonVariants({variant: "ghost", size: "sm"}))}
            >
              Sign in
            </Link>
          </div>
        </header>

        <main className="relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-16 px-4 py-16">
          <section className="mx-auto max-w-2xl space-y-6 text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl shadow-secondary">
              <DevPilotIcon className="size-14 rounded-2xl"/>
            </div>
            <div className="space-y-3">
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
                DevPilot
              </h1>
              <p className="text-lg text-muted-foreground text-balance">
                Connect GitHub, index any repository, and chat with your codebase
                using retrieval-augmented answers and citations.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a 
                href={getGithubLoginUrl()}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "inline-flex items-center gap-1.5"
                )}>
                  <FolderGit2 className="size-4"/>
                  Continue with GitHub
                  <ArrowRight className="size-4"/>
                </a>
              
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex items-center gap-1.5"
                )}
              >
                See how it works
              </Link>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border bg-card/60 p-6 shadow-sm">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-muted">
                <FolderGit2 className="size-5" />
              </div>

              <h2 className="mb-2 text-lg font-semibold">
                Connect GitHub
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                OAuth with repo scope for public and private repositories.
              </p>
            </div>

            <div className="rounded-3xl border bg-card/60 p-6 shadow-sm">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-muted">
                <Sparkles className="size-5" />
              </div>

              <h2 className="mb-2 text-lg font-semibold">
                Index with RAG
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Chunk and embed your code into Postgres + pgvector.
              </p>
            </div>

            <div className="rounded-3xl border bg-card/60 p-6 shadow-sm">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-muted">
                <MessageSquareCode className="size-5" />
              </div>

              <h2 className="mb-2 text-lg font-semibold">
                Ask anything
              </h2>

              <p className="text-sm leading-relaxed text-muted-foreground">
                Get grounded answers with clickable citations.
              </p>
            </div>
          </section>
        </main>
      </div>
   
  );
}
