
"use client";

import { useEffect, useState } from "react";
import { AlertCircle, PanelLeft } from "lucide-react";

import {
  useChatMessages,
  useChatSessions,
  useCreateChatSession,
  useStreamChat,
} from "@/hooks/use-chat";

import ChatSidebar from "./chat-sidebar";
import ChatMessages from "./chat-messages";
import ChatComposer from "./chat-composer";

type ChatViewProps = {
  repoId: string;
};

export default function ChatView({ repoId }: ChatViewProps) {
  const [activeSessionId, setActiveSessionId] = useState<
    string | null
  >(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sessionsQuery = useChatSessions(repoId);
  const createSession = useCreateChatSession(repoId);
  const messagesQuery = useChatMessages(activeSessionId);

  const {
    send,
    stop,
    streaming,
    streamText,
  } = useStreamChat(activeSessionId);

  const sessions = sessionsQuery.data ?? [];
  const messages = messagesQuery.data ?? [];

  useEffect(() => {
    if (
      !activeSessionId &&
      sessions.length > 0
    ) {
      setActiveSessionId(sessions[0].id);
    }
  }, [sessions, activeSessionId]);

  async function handleNewChat() {
    try {
      const session = await createSession.mutateAsync();
      setActiveSessionId(session.id);
    } catch {
      // useCreateChatSession displays the error toast.
    }
  }

  async function handleSend(content: string) {
    if (!activeSessionId || streaming) return;
    await send(content);
  }

  const initialLoading =
    sessionsQuery.isLoading ||
    (Boolean(activeSessionId) && messagesQuery.isLoading);

  return (
    <div className="flex h-full min-h-0 overflow-hidden rounded-xl border border-border bg-background text-foreground">
      {sidebarOpen && (
        <div className="hidden w-64 shrink-0 md:block">
          <ChatSidebar
            sessions={sessions}
            activeSessionId={activeSessionId}
            onSelect={setActiveSessionId}
            onNewChat={handleNewChat}
            creating={createSession.isPending}
          />
        </div>
      )}

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Toggle chat sidebar"
              className="rounded-lg p-2 transition-colors hover:bg-muted"
            >
              <PanelLeft className="size-4" />
            </button>

            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold">
                DevPilot AI
              </h1>
              <p className="text-xs text-muted-foreground">
                Repository assistant
              </p>
            </div>
          </div>

          {!activeSessionId && (
            <button
              type="button"
              onClick={handleNewChat}
              disabled={createSession.isPending}
              className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-muted disabled:opacity-50"
            >
              {createSession.isPending
                ? "Creating..."
                : "New chat"}
            </button>
          )}
        </header>

        {sessionsQuery.isError ? (
          <div className="flex flex-1 items-center justify-center gap-2 p-6 text-sm text-destructive">
            <AlertCircle className="size-4" />
            Could not load chat sessions.
            <button
              type="button"
              onClick={() => void sessionsQuery.refetch()}
              className="underline"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col px-4 py-6 sm:px-6">
                {!activeSessionId &&
                !sessionsQuery.isLoading ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-semibold">
                      Start a conversation
                    </h2>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Create a chat to ask questions about your
                      repository and explore your code with AI.
                    </p>
                    <button
                      type="button"
                      onClick={handleNewChat}
                      disabled={createSession.isPending}
                      className="mt-5 rounded-xl bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-80 disabled:opacity-50"
                    >
                      {createSession.isPending
                        ? "Creating chat..."
                        : "Create your first chat"}
                    </button>
                  </div>
                ) : (
                  <ChatMessages
                    messages={messages}
                    streamText={streamText}
                    streaming={streaming}
                    loading={initialLoading}
                    error={
                      messagesQuery.isError
                        ? "Could not load messages. Please try again."
                        : null
                    }
                  />
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-border bg-background px-4 py-4 sm:px-6">
              <div className="mx-auto w-full max-w-4xl">
                <ChatComposer
                  onSend={handleSend}
                  onStop={stop}
                  streaming={streaming}
                  disabled={!activeSessionId}
                />
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  AI responses can be inaccurate. Verify important
                  code changes before applying them.
                </p>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
