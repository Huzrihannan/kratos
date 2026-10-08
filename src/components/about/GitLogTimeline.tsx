"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GitCommitItem {
  hash: string;
  tag?: string;
  date: string;
  author: string;
  message: string;
  isHead?: boolean;
}

const COMMITS: GitCommitItem[] = [
  {
    hash: "c9f401a",
    tag: "HEAD -> main",
    date: "2026-10-08",
    author: "@krat-os",
    message: "release(v2.0): Krat.OS operating system architecture & brand live",
    isHead: true,
  },
  {
    hash: "a4b9e11",
    tag: "tag: v1.8",
    date: "2026-04-12",
    author: "@alex-chen",
    message: "feat(pipeline): strict sub-100ms edge gateway standard across all modules",
  },
  {
    hash: "8e90c24",
    date: "2025-11-03",
    author: "@sarah-jenkins",
    message: "refactor(tokens): eliminate generic design debt in favor of monospace precision",
  },
  {
    hash: "6f81a3d",
    tag: "tag: v1.4",
    date: "2025-06-18",
    author: "@david-okafor",
    message: "feat(mobile): offline-first SQLite synchronization engine stabilized",
  },
  {
    hash: "3c72d8e",
    date: "2024-10-25",
    author: "@maya-patel",
    message: "feat(data): automated async worker pipeline with zero message loss",
  },
  {
    hash: "1a0f92b",
    tag: "tag: v1.0",
    date: "2024-03-01",
    author: "@krat-os",
    message: "init: repository created. zero bloat, strict TypeScript, 100% client code ownership",
  },
];

export function GitLogTimeline({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[2px] border border-line bg-surface/90 overflow-hidden font-mono select-none",
        className
      )}
    >
      {/* Chrome Title Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-line bg-surface">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80 hover:bg-red" />
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80" />
            <span className="h-2 w-2 rounded-[1px] border border-line-strong/80" />
          </div>
          <span className="text-[11px] text-fg-muted uppercase tracking-mono font-medium">
            git log --graph --oneline --decorate
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-ok">
          <span className="w-1.5 h-1.5 rounded-full bg-ok" />
          <span>BRANCH: MAIN</span>
        </div>
      </div>

      {/* Terminal Tree Output */}
      <div className="p-4 sm:p-6 space-y-4 overflow-x-auto text-xs">
        {COMMITS.map((commit, idx) => (
          <div key={commit.hash} className="flex items-start gap-3 min-w-[580px] group">
            {/* Git Branch Graph Node */}
            <div className="flex flex-col items-center pt-0.5 shrink-0" aria-hidden="true">
              <span
                className={cn(
                  "w-3 h-3 rounded-full border flex items-center justify-center transition-colors",
                  commit.isHead
                    ? "border-red bg-red/20 text-red"
                    : "border-line-strong bg-bg group-hover:border-fg"
                )}
              >
                <span
                  className={cn(
                    "w-1 h-1 rounded-full",
                    commit.isHead ? "bg-red" : "bg-line-strong group-hover:bg-fg"
                  )}
                />
              </span>
              {idx < COMMITS.length - 1 && (
                <span className="w-[1px] h-9 bg-line my-1" />
              )}
            </div>

            {/* Commit Metadata */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-bold text-red-text">
                  {commit.hash}
                </span>
                {commit.tag && (
                  <span className="px-1.5 py-0.2 rounded-[2px] bg-line/60 text-fg text-[10px] font-bold">
                    ({commit.tag})
                  </span>
                )}
                <span className="text-fg font-medium">
                  {commit.message}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[10px] text-fg-muted/70 shrink-0">
                <span>{commit.author}</span>
                <span>•</span>
                <span>{commit.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Status */}
      <div className="px-4 py-2 border-t border-line bg-bg/60 text-[10px] text-fg-muted flex items-center justify-between">
        <span>COMMIT_TREE: LINEAR</span>
        <span>MERGE_STRATEGY: FAST-FORWARD_ONLY</span>
      </div>
    </div>
  );
}
