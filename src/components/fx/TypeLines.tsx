"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Caret } from "./Caret";
import { useMotionLevel } from "@/lib/motion/MotionContext";

export interface TerminalLine {
  prompt?: string;
  text: string;
  delay?: number;
  progressBar?: boolean;
  status?: 'ok' | 'info' | 'warn' | 'error';
}

export type TypeLineItem = TerminalLine;

export interface TypeLinesProps {
  lines: TerminalLine[];
  loop?: boolean;
  onComplete?: () => void;
  className?: string;
}

export function TypeLines({ lines, loop = false, onComplete, className = "" }: TypeLinesProps) {
  const { isOff } = useMotionLevel();
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset when lines list changes
  useEffect(() => {
    setCurrentLineIndex(0);
    setCurrentCharIndex(0);
    setProgress(0);
    setCompleted(false);
  }, [lines]);

  useEffect(() => {
    if (isOff) {
      setCurrentLineIndex(lines.length - 1);
      setCurrentCharIndex(lines[lines.length - 1]?.text.length || 0);
      setProgress(100);
      setCompleted(true);
      return;
    }

    if (currentLineIndex >= lines.length) {
      setCompleted(true);
      if (onComplete) {
        timerRef.current = setTimeout(() => {
          onComplete();
        }, 2200);
      } else if (loop) {
        timerRef.current = setTimeout(() => {
          setCurrentLineIndex(0);
          setCurrentCharIndex(0);
          setProgress(0);
          setCompleted(false);
        }, 2400);
      }
      return;
    }

    const currentLine = lines[currentLineIndex];
    if (!currentLine) return;

    if (currentLine.progressBar) {
      // Progress bar animation
      if (progress < 100) {
        timerRef.current = setTimeout(() => {
          setProgress((p) => Math.min(p + 10, 100));
        }, 60);
      } else {
        timerRef.current = setTimeout(() => {
          setCurrentLineIndex((idx) => idx + 1);
          setCurrentCharIndex(0);
          setProgress(0);
        }, currentLine.delay || 400);
      }
    } else {
      // Character typing animation with natural jitter (28-40ms)
      const targetText = currentLine.text;
      if (currentCharIndex < targetText.length) {
        const jitter = Math.floor(Math.random() * 12) + 28;
        timerRef.current = setTimeout(() => {
          setCurrentCharIndex((c) => c + 1);
        }, jitter);
      } else {
        // Move to next line after line delay
        timerRef.current = setTimeout(() => {
          setCurrentLineIndex((idx) => idx + 1);
          setCurrentCharIndex(0);
        }, currentLine.delay || 350);
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentLineIndex, currentCharIndex, progress, lines, loop, isOff, onComplete]);

  return (
    <div
      className={cn(
        "font-mono text-xs sm:text-sm text-fg-muted space-y-1.5 select-none leading-relaxed",
        className
      )}
    >
      {lines.slice(0, currentLineIndex + 1).map((line, idx) => {
        const isCurrent = idx === currentLineIndex;
        const prompt = line.prompt || ">";

        if (line.progressBar) {
          const currentProg = isCurrent ? progress : 100;
          const barLength = 16;
          const filled = Math.round((currentProg / 100) * barLength);
          const empty = barLength - filled;
          const barString = `[${"█".repeat(filled)}${"░".repeat(empty)}] ${currentProg}%`;

          return (
            <div key={idx} className="flex items-center gap-2">
              <span className="text-red-text font-bold">{prompt}</span>
              <span className="text-fg">{line.text}</span>
              <span className="text-red-text">{barString}</span>
              {isCurrent && !completed && <Caret width={6} height="1em" />}
            </div>
          );
        }

        const visibleChars = isCurrent ? line.text.slice(0, currentCharIndex) : line.text;

        return (
          <div key={idx} className="flex items-start gap-2">
            <span className="text-red-text font-bold shrink-0">{prompt}</span>
            <span className="text-fg">
              {visibleChars}
              {isCurrent && !completed && <Caret width={6} height="1em" className="ml-1" />}
            </span>
          </div>
        );
      })}
    </div>
  );
}
