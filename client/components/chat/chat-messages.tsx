
"use client";

import type { ChatMessage } from "@/lib/api";
import ChatMarkdown from "./chat-markdown";
import CitationChips from "./citation-chips";
import { Bot, UserRound } from "lucide-react";

type ChatMessagesProps = {
  messages: ChatMessage[];
  streamText: string;
  streaming: boolean;
  loading?: boolean;
  error?: string | null;
};

export default function ChatMessages({
  messages,
  streamText,
  streaming,
  loading = false,
  error,
}: ChatMessagesProps) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading conversation...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {messages.length === 0 && !streamText && !streaming && (
        <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-border bg-muted">
            <Bot className="size-7" />
          </div>

          <h2 className="text-lg font-semibold">
            Chat with your code
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Ask DevPilot to explain a class, trace a bug, or
            understand how your repository works.
          </p>
        </div>
      )}

      {messages.map((message) => (
        <article
          key={message.id}
          className="flex min-w-0 gap-3"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
            {message.role === "USER" ? (
              <UserRound className="size-4" />
            ) : (
              <Bot className="size-4" />
            )}
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <div className="mb-2 text-sm font-semibold">
              {message.role === "USER" ? "You" : "DevPilot"}
            </div>

            {message.role === "USER" ? (
              <p className="whitespace-pre-wrap break-words text-sm leading-7">
                {message.content}
              </p>
            ) : (
              <ChatMarkdown content={message.content} />
            )}

            {message.role === "ASSISTANT" && (
              <CitationChips citations={message.citation ?? []} />
            )}
          </div>
        </article>
      ))}

      {(streaming || streamText) && (
        <article className="flex min-w-0 gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted">
            <Bot className="size-4" />
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <div className="mb-2 text-sm font-semibold">
              DevPilot
            </div>

            {streamText ? (
              <ChatMarkdown content={streamText} />
            ) : (
              <p className="animate-pulse text-sm text-muted-foreground">
                Thinking...
              </p>
            )}

            {streaming && streamText && (
              <span className="ml-1 inline-block h-4 w-1 animate-pulse rounded-sm bg-current align-middle" />
            )}
          </div>
        </article>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
