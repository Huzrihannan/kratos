"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface NavModuleItem {
  id: string;
  slug: string;
  index: string;
  title: string;
}

interface ServiceStickyNavProps {
  modules: NavModuleItem[];
  className?: string;
}

export function ServiceStickyNav({ modules, className }: ServiceStickyNavProps) {
  const [activeId, setActiveId] = useState<string>(modules[0]?.id || "");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 260; // offset for header / scrollspy trigger

      for (let i = modules.length - 1; i >= 0; i--) {
        const item = modules[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollY >= top - offset) {
            setActiveId(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [modules]);

  const scrollToModule = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 110;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <aside
      aria-label="Module directory navigation"
      className={cn(
        "sticky top-28 hidden lg:block w-64 shrink-0 font-mono text-xs select-none",
        className
      )}
    >
      <div className="border border-line bg-surface/80 p-4 rounded-[2px] backdrop-blur-sm">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-line text-[11px] text-fg-muted uppercase tracking-mono">
          <span>/01 — INDEX</span>
          <span className="flex items-center gap-1.5 text-ok">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" />
            <span>6 MODULES</span>
          </span>
        </div>

        <nav className="space-y-1">
          {modules.map((m) => {
            const isActive = activeId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => scrollToModule(m.id)}
                className={cn(
                  "w-full text-left px-2.5 py-2 rounded-[2px] transition-colors duration-150 flex items-center justify-between group",
                  isActive
                    ? "bg-bg text-fg border-l-2 border-red pl-2"
                    : "text-fg-muted hover:text-fg hover:bg-bg/40 border-l-2 border-transparent"
                )}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className={cn(
                    "text-[10px]",
                    isActive ? "text-red-text font-bold" : "text-fg-muted/60"
                  )}>
                    {m.index}
                  </span>
                  <span className="truncate">{m.title}</span>
                </div>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-4 pt-3 border-t border-line/60 text-[10px] text-fg-muted/60 flex items-center justify-between">
          <span>STATUS: SYNCED</span>
          <span>SPY: ACTIVE</span>
        </div>
      </div>
    </aside>
  );
}
