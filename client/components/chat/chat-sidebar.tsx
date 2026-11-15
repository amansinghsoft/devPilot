
"use client";

import type { ChatSession } from "@/lib/api";
import { MessageSquare, Plus, Clock3 } from "lucide-react";

type ChatSidebarProps = {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelect: (sessionId: string) => void;
  onNewChat: () => void;
  creating?: boolean;
};

export default function ChatSidebar({
  sessions,
  activeSessionId,
  onSelect,
  onNewChat,
  creating = false,
}: ChatSidebarProps) {
  return (
    <aside className="flex h-full min-h-0 flex-col border-r border-border bg-background">
      <div className="border-b border-border p-4">
        <button
          type="button"
          onClick={onNewChat}
          disabled={creating}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          <Plus className="size-4" />
          {creating ? "Creating..." : "New chat"}
        </button>
      </div>

      <div className="px-4 pb-2 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Recent conversations
        </p>
      </div>

      <div className="min-h-0 flex-1 space-y-1 overflow-y-auto px-2 pb-4">
        {sessions.length === 0 ? (
          <p className="px-3 py-5 text-sm text-muted-foreground">
            Your conversations will appear here.
          </p>
        ) : (
          sessions.map((session) => {
            const active = session.id === activeSessionId;

            return (
              <button
                key={session.id}
                type="button"
                onClick={() => onSelect(session.id)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors ${
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <MessageSquare className="mt-0.5 size-4 shrink-0" />

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">
                    {session.title || "New conversation"}
                  </span>

                  <span className="mt-1 flex items-center gap-1 text-xs opacity-70">
                    <Clock3 className="size-3" />
                    {new Date(session.createdAt).toLocaleDateString()}
                  </span>
                </span>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
