"use client";
declare global {
  interface Window {
    plausible?: (e: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.plausible)
    window.plausible(event, { props });
}
