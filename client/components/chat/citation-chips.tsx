
"use client";

import type { citation } from "@/lib/api";
import { FileCode2, Copy } from "lucide-react";

type CitationChipsProps = {
  citations: citation[];
};

export default function CitationChips({
  citations,
}: CitationChipsProps) {
  if (!citations?.length) return null;

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {citations.map((item, index) => {
        const lineLabel =
          item.startLine != null
            ? item.endLine != null &&
              item.endLine !== item.startLine
              ? `L${item.startLine}–${item.endLine}`
              : `L${item.startLine}`
            : null;

        return (
          <button
            key={`${item.filePath}-${item.startLine}-${index}`}
            type="button"
            title={`Copy source path: ${item.filePath}`}
            onClick={() => {
              const location = lineLabel
                ? `${item.filePath}:${lineLabel}`
                : item.filePath;

              void navigator.clipboard
                ?.writeText(location)
                .catch(() => {});
            }}
            className="inline-flex max-w-full items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <FileCode2 className="size-3.5 shrink-0" />

            <span className="max-w-56 truncate">
              {item.filePath}
            </span>

            {lineLabel && (
              <span className="shrink-0 rounded bg-background px-1.5 py-0.5 font-mono">
                {lineLabel}
              </span>
            )}

            <Copy className="size-3 shrink-0 opacity-60" />
          </button>
        );
      })}
    </div>
  );
}
