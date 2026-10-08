"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface PipelineNode {
  id: string;
  label: string;
  sublabel?: string;
}

export interface PipelineProps {
  nodes?: PipelineNode[];
  currentNodeId?: string;
  speed?: number; // ms for packet to traverse each segment
  className?: string;
}

const DEFAULT_NODES: PipelineNode[] = [
  { id: "01", label: "SPECIFICATION", sublabel: "Requirements & Arch" },
  { id: "02", label: "SYNTHESIS", sublabel: "Types & Contracts" },
  { id: "03", label: "EXECUTION", sublabel: "Automated Build" },
  { id: "04", label: "DEPLOYMENT", sublabel: "Edge Verification" },
];

export function Pipeline({
  nodes = DEFAULT_NODES,
  currentNodeId,
  speed = 1800,
  className = "",
}: PipelineProps) {
  const { isOff } = useMotionLevel();
  const initialIndex = currentNodeId
    ? Math.max(0, nodes.findIndex((n) => n.id === currentNodeId))
    : 0;
  const [activeNodeIndex, setActiveNodeIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOff) return;

    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % nodes.length);
    }, speed);

    return () => clearInterval(interval);
  }, [nodes.length, speed, isOff]);

  return (
    <div
      className={cn(
        "relative w-full p-4 sm:p-6 rounded-[2px] border border-line bg-surface/60 font-mono select-none overflow-hidden",
        className
      )}
    >
      {/* Top Header Label */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-line text-xs uppercase tracking-[0.08em] text-fg-muted">
        <span>/SYS.PIPELINE</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse" />
          <span>ACTIVE</span>
        </span>
      </div>

      {/* Nodes and Circuit Track */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {nodes.map((node, idx) => {
          const isActive = idx === activeNodeIndex || isOff;
          const isPassed = idx < activeNodeIndex || isOff;

          return (
            <div
              key={node.id}
              className={cn(
                "relative p-3.5 sm:p-4 rounded-[2px] border transition-colors duration-200 flex flex-col justify-between min-h-[96px]",
                isActive
                  ? "border-red-text bg-surface shadow-subtle"
                  : isPassed
                  ? "border-line-strong/80 bg-surface/50"
                  : "border-line bg-surface/20 opacity-70"
              )}
            >
              {/* Node ID & LED Marker */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-fg-muted">
                  /{node.id}
                </span>
                <span
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    isActive
                      ? "bg-red shadow-[0_0_8px_#FD142B]"
                      : isPassed
                      ? "bg-line-strong"
                      : "bg-line"
                  )}
                />
              </div>

              {/* Node Title & Description */}
              <div>
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.06em] text-fg">
                  {node.label}
                </div>
                {node.sublabel && (
                  <div className="font-sans text-[11px] text-fg-muted mt-0.5">
                    {node.sublabel}
                  </div>
                )}
              </div>

              {/* Connecting Packet Track between adjacent nodes */}
              {idx < nodes.length - 1 && (
                <div
                  className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-line-strong z-10"
                  aria-hidden="true"
                >
                  {isActive && !isOff && (
                    <span className="absolute top-[-2px] left-0 h-[5px] w-[5px] rounded-[1px] bg-red animate-ping" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
