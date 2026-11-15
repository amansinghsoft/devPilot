
"use client";

import { useState } from "react";
import { ArrowUp, Square } from "lucide-react";

type ChatComposerProps = {
  onSend: (content: string) => void | Promise<void>;
  onStop: () => void;
  streaming: boolean;
  disabled?: boolean;
};

export default function ChatComposer({
  onSend,
  onStop,
  streaming,
  disabled = false,
}: ChatComposerProps) {
  const [content, setContent] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const message = content.trim();

    if (!message || streaming || disabled) return;

    setContent("");
    await onSend(message);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-background p-3 shadow-sm"
    >
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" &&
            !event.shiftKey &&
            !event.nativeEvent.isComposing
          ) {
            event.preventDefault();
            event.currentTarget.form?.requestSubmit();
          }
        }}
        placeholder="Ask anything about your repository..."
        rows={2}
        disabled={disabled}
        aria-label="Message the AI about your repository"
        className="max-h-48 min-h-14 w-full resize-y bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
      />

      <div className="flex items-center justify-between gap-3 pt-2">
        <p className="text-xs text-muted-foreground">
          Enter to send · Shift + Enter for a new line
        </p>

        {streaming ? (
          <button
            type="button"
            onClick={onStop}
            aria-label="Stop generating"
            className="inline-flex size-9 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80"
          >
            <Square className="size-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={disabled || !content.trim()}
            aria-label="Send message"
            className="inline-flex size-9 items-center justify-center rounded-xl bg-foreground text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowUp className="size-5" />
          </button>
        )}
      </div>
    </form>
  );
}
