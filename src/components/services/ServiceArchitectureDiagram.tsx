"use client";

import React, { useRef } from "react";
import { useInViewPlayback } from "@/lib/motion/useInViewPlayback";
import { useMotionLevel } from "@/lib/motion/MotionContext";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  label: string;
  type: string;
  badge?: string;
  metric?: string;
}

interface ServiceArchitectureDiagramProps {
  slug: string;
  className?: string;
}

const ARCHITECTURES: Record<string, { title: string; nodes: ArchitectureNode[]; packets: string[] }> = {
  "web-apps": {
    title: "DISTRIBUTED_EDGE_ARCHITECTURE",
    nodes: [
      { id: "client", label: "01. CLIENT_DEVICE", type: "NEXT.JS 15 APP ROUTER", badge: "EDGE_SSR", metric: "< 50ms" },
      { id: "edge", label: "02. API_GATEWAY", type: "EDGE FUNCTIONS & AUTH", badge: "JWT_RBAC", metric: "99.99%" },
      { id: "queue", label: "03. ASYNC_PIPELINE", type: "MESSAGE QUEUE & CRON", badge: "BULLMQ", metric: "0 DROPPED" },
      { id: "db", label: "04. PERSISTENCE", type: "POSTGRESQL & REDIS", badge: "RLS_ISOLATED", metric: "SUB-10MS" },
    ],
    packets: ["JSON_REQ", "AUTH_TOKEN", "JOB_DISPATCH", "ROW_MUTATION"],
  },
  "mobile-apps": {
    title: "OFFLINE_FIRST_MOBILE_FLOW",
    nodes: [
      { id: "client", label: "01. NATIVE_APP", type: "REACT NATIVE / EXPO", badge: "60_FPS", metric: "OFFLINE_OK" },
      { id: "sqlite", label: "02. LOCAL_STORE", type: "SQLITE ENCRYPTED CACHE", badge: "ZERO_LATENCY", metric: "0ms" },
      { id: "sync", label: "03. SYNC_ENGINE", type: "DELTA CONFLICT RESOLVER", badge: "WEBSOCKET", metric: "AUTO_RETRY" },
      { id: "cloud", label: "04. PUSH_NOTIFS", type: "APNS & FCM GATEWAY", badge: "DELIVERY", metric: "< 200ms" },
    ],
    packets: ["TOUCH_EVENT", "SQLITE_WRITE", "DELTA_SYNC", "PUSH_ALERT"],
  },
  "ecommerce": {
    title: "HEADLESS_COMMERCE_LEDGER",
    nodes: [
      { id: "store", label: "01. HEADLESS_STORE", type: "STATIC EDGE STOREFRONT", badge: "GLOBAL_CDN", metric: "< 80ms" },
      { id: "cart", label: "02. CHECKOUT_CORE", type: "IDEMPOTENT ORDER API", badge: "STRIPE_VERIFIED", metric: "STRICT_LOCK" },
      { id: "ledger", label: "03. INVENTORY_LEDGER", type: "ATOMIC STOCK AUDIT", badge: "NO_OVERSELL", metric: "REALTIME" },
      { id: "logistics", label: "04. DISPATCH_BUS", type: "FULFILLMENT WEBHOOKS", badge: "AUTO_PACK", metric: "SYNCED" },
    ],
    packets: ["SKU_QUERY", "TOKENIZED_PAY", "STOCK_DECREMENT", "WEBHOOK_POST"],
  },
  "ai-workflows": {
    title: "ENTERPRISE_RAG_PIPELINE",
    nodes: [
      { id: "ingest", label: "01. DATA_INGEST", type: "DOCUMENTS & API STREAMS", badge: "ETL_PIPELINE", metric: "CHUNKING" },
      { id: "vector", label: "02. VECTOR_INDEX", type: "EMBEDDINGS & PGVECTOR", badge: "COSINE_SIM", metric: "SUB-15MS" },
      { id: "llm", label: "03. INFERENCE_ROUTER", type: "GUARDRAIL VALIDATOR", badge: "STRICT_SCHEMA", metric: "TOKEN_CAPPED" },
      { id: "output", label: "04. CLIENT_RUNTIME", type: "STREAMING SSE WEBHOOK", badge: "VERIFIED", metric: "JSON_OUTPUT" },
    ],
    packets: ["RAW_DOC", "EMBED_VEC", "PROMPT_CTX", "SSE_STREAM"],
  },
  "ui-ux-design": {
    title: "DESIGN_TOKEN_ENGINEERING",
    nodes: [
      { id: "primitives", label: "01. TOKEN_PRIMITIVES", type: "PALETTES, RADII & SPACING", badge: "FIGMA_VARIABLES", metric: "SYSTEM_WIDE" },
      { id: "components", label: "02. ATOMIC_SPECS", type: "COMPONENT VARIANTS", badge: "WCAG_AA", metric: "100% COVERED" },
      { id: "motion", label: "03. MOTION_PHYSICS", type: "MECHANICAL BEZIER CURVES", badge: "EXPO_EASING", metric: "CSS_SYNCED" },
      { id: "code", label: "04. CODE_GENERATION", type: "TAILWIND TOKENS & REACT", badge: "STORYBOOK", metric: "1:1 FIDELITY" },
    ],
    packets: ["HEX_TOKEN", "STATE_DEF", "EASE_SPEC", "COMPONENT_TSX"],
  },
  "maintenance-support": {
    title: "CONTINUOUS_HEALTH_TELEMETRY",
    nodes: [
      { id: "probes", label: "01. GLOBAL_PROBES", type: "SYNTHETIC HTTP MONITORS", badge: "60S_CADENCE", metric: "MULTI_REGION" },
      { id: "telemetry", label: "02. ERROR_TRACKING", type: "SENTRY TRACE STREAM", badge: "SOURCEMAP", metric: "REALTIME" },
      { id: "autoheal", label: "03. ANOMALY_FILTER", type: "AUTO-ROLLBACK TRIGGER", badge: "CIRCUIT_BREAKER", metric: "INSTANT" },
      { id: "uptime", label: "04. SLA_STATUS", type: "PUBLIC TRANSPARENCY HUB", badge: "OPERATIONAL", metric: "99.98%" },
    ],
    packets: ["HEALTH_PING", "TRACE_CRASH", "ALERT_DISPATCH", "ROLLBACK_EXEC"],
  },
};

export function ServiceArchitectureDiagram({ slug, className }: ServiceArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewPlayback(containerRef);
  const { isOff } = useMotionLevel();

  const arch = ARCHITECTURES[slug] || ARCHITECTURES["web-apps"];

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative rounded-[2px] border border-line bg-surface/90 overflow-hidden font-mono select-none",
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
            architecture_pipeline.diag [{arch.title}]
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-ok">
          <span className="w-1.5 h-1.5 rounded-full bg-ok animate-pulse" />
          <span>PACKET_BUS_ONLINE</span>
        </div>
      </div>

      {/* Blueprint Grid Canvas Area */}
      <div className="relative p-6 sm:p-8 overflow-x-auto">
        {/* Vector Nodes Grid */}
        <div className="min-w-[680px] grid grid-cols-4 gap-4 relative">
          {arch.nodes.map((node, idx) => (
            <div key={node.id} className="relative z-10 flex flex-col">
              {/* Node Card */}
              <div className="border border-line hover:border-line-strong bg-bg/95 p-3.5 rounded-[2px] transition-colors flex flex-col justify-between h-36">
                <div>
                  <div className="flex items-center justify-between text-[10px] text-fg-muted/70 mb-1.5">
                    <span>{node.label}</span>
                    <span className="text-red-text font-bold">[{node.badge}]</span>
                  </div>
                  <h4 className="text-xs font-bold text-fg leading-snug">
                    {node.type}
                  </h4>
                </div>

                <div className="pt-2 border-t border-line/60 flex items-center justify-between text-[10px]">
                  <span className="text-fg-muted">LATENCY:</span>
                  <span className="text-ok font-bold">{node.metric}</span>
                </div>
              </div>

              {/* Connecting Bus Line to Next Node */}
              {idx < arch.nodes.length - 1 && (
                <div
                  className="absolute top-1/2 -right-4 w-4 h-[1px] bg-line-strong z-0 pointer-events-none"
                  aria-hidden="true"
                >
                  {/* Moving Packet Dot */}
                  {!isOff && isInView && (
                    <span
                      className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red animate-ping"
                      style={{ animationDuration: "1.8s", animationDelay: `${idx * 0.4}s` }}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bus Protocol Status Footer */}
        <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center justify-between text-[11px] text-fg-muted gap-3">
          <div className="flex items-center gap-3">
            <span className="text-red-text font-bold">FLOW_VERIFICATION:</span>
            <span className="text-fg">ISO/IEC_25010_PERFORMANCE</span>
          </div>
          <div className="flex items-center gap-4 text-[10px]">
            <span>BUS: PROTO_V2</span>
            <span>DRAIN_RATE: ZERO_BUFFER</span>
            <span className="text-ok">STATUS: HEALTHY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
