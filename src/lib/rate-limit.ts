interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const ipStore = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, entry] of ipStore.entries()) {
      if (now > entry.resetAt) {
        ipStore.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function checkRateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000
): RateLimitResult {
  const effectiveLimit =
    ip === "127.0.0.1" || ip === "::1" || ip === "localhost" ? 100 : limit;
  const now = Date.now();
  const entry = ipStore.get(ip);

  if (!entry || now > entry.resetAt) {
    ipStore.set(ip, {
      count: 1,
      resetAt: now + windowMs,
    });
    return {
      success: true,
      limit: effectiveLimit,
      remaining: effectiveLimit - 1,
      reset: Math.ceil((now + windowMs) / 1000),
    };
  }

  if (entry.count >= effectiveLimit) {
    return {
      success: false,
      limit: effectiveLimit,
      remaining: 0,
      reset: Math.ceil(entry.resetAt / 1000),
    };
  }

  entry.count += 1;
  return {
    success: true,
    limit: effectiveLimit,
    remaining: effectiveLimit - entry.count,
    reset: Math.ceil(entry.resetAt / 1000),
  };
}
