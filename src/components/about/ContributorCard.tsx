"use client";

import React from "react";
import { TeamMember } from "@/content/about";
import { cn } from "@/lib/utils";

interface ContributorCardProps {
  member: TeamMember;
  className?: string;
}

export function ContributorCard({ member, className }: ContributorCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-[2px] border border-line hover:border-line-strong bg-surface/90 p-5 font-mono text-xs transition-colors duration-200 select-none",
        className
      )}
    >
      {/* Corner Brackets */}
      <span className="absolute -top-[1px] -left-[1px] h-2 w-2 border-t border-l border-red-text pointer-events-none" aria-hidden="true" />
      <span className="absolute -top-[1px] -right-[1px] h-2 w-2 border-t border-r border-red-text pointer-events-none" aria-hidden="true" />
      <span className="absolute -bottom-[1px] -left-[1px] h-2 w-2 border-b border-l border-red-text pointer-events-none" aria-hidden="true" />
      <span className="absolute -bottom-[1px] -right-[1px] h-2 w-2 border-b border-r border-red-text pointer-events-none" aria-hidden="true" />

      <div>
        {/* Header Strip */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-line text-[11px]">
          <span className="text-red-text font-bold">@{member.id}</span>
          <span className="text-[10px] text-fg-muted/70 uppercase">CONTRIBUTOR</span>
        </div>

        {/* Avatar Graphic with CRT Scanline on Hover */}
        <div className="relative w-full h-36 rounded-[2px] bg-bg border border-line mb-4 overflow-hidden flex items-center justify-center">
          {/* Subtle Blueprint Grid Pattern */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #7A7A7A 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />

          {/* Initials & Crosshair Center */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            <span className="w-12 h-12 rounded-[2px] border border-line-strong bg-surface flex items-center justify-center font-bold text-base text-fg group-hover:border-red transition-colors">
              {initials}
            </span>
            <span className="text-[10px] text-fg-muted mt-2 uppercase tracking-mono">
              [COMMITS: ACTIVE]
            </span>
          </div>

          {/* Horizontal CRT Scanline on Hover */}
          <div
            className="absolute inset-x-0 h-1 bg-red/40 blur-[1px] -translate-y-full opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Name & Role */}
        <h3 className="text-sm font-bold text-fg mb-1">
          {member.name}
        </h3>
        <p className="text-[11px] text-red-text font-medium mb-3">
          {member.role}
        </p>

        {/* Bio */}
        <p className="text-fg-muted text-[11px] leading-relaxed mb-4">
          {member.bio}
        </p>
      </div>

      {/* Specialty Footer */}
      <div className="pt-3 border-t border-line flex items-center justify-between text-[10px] text-fg-muted">
        <span>CORE:</span>
        <span className="text-fg font-bold">{member.specialty}</span>
      </div>
    </div>
  );
}
