
"use client";

import { useQuery } from "@tanstack/react-query";
import { LogOut } from "lucide-react";

import { api, type User } from "@/lib/api";
import { queryKeys } from "@/lib/query-keys";
import { useLogout } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";

export function SettingDashboard() {
  const {
    data: user,
    isPending,
    isError,
  } = useQuery<User, Error>({
    queryKey: queryKeys.auth.me(),
    queryFn: () => api.me(),
    retry: false,
  });

  const logout = useLogout();

  return (
    <main className="flex-1 bg-background p-5 text-foreground transition-colors duration-300 sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight">
        Account settings
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Manage your connected GitHub account.
      </p>

      {/* GitHub account */}
      <section className="mt-7 max-w-2xl rounded-2xl border border-border bg-card p-5 text-card-foreground shadow-sm">
        <h3 className="font-semibold">GitHub account</h3>

        {isPending ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Loading account...
          </p>
        ) : isError ? (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            Could not load account details.
          </p>
        ) : (
          <div className="mt-4 flex items-center gap-3">
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="GitHub profile"
                className="size-12 rounded-full border border-border object-cover"
              />
            ) : (
              <div className="grid size-12 place-items-center rounded-full bg-muted font-semibold text-muted-foreground">
                {user?.displayName?.slice(0, 1) ?? "U"}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate font-medium">
                {user?.displayName || "GitHub user"}
              </p>
              <p className="truncate text-sm text-muted-foreground">
                @{user?.githubUsername}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Logout section */}
      <section className="mt-6 max-w-2xl rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h3 className="font-semibold">Sign out</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          Log out of your DevPilot account on this device.
        </p>

        <Button
          variant="destructive"
          className="mt-4"
          onClick={() => logout.mutate()}
          disabled={logout.isPending}
        >
          <LogOut className="mr-2 size-4" />
          {logout.isPending ? "Logging out..." : "Log out"}
        </Button>
      </section>
    </main>
  );
}
