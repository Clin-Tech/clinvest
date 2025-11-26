"use client";
import { useEffect, useMemo, useState, useCallback } from "react";
import { allProperties } from "@/customer/utils/data";
import type { Property } from "@/types/property";

const KEY = "saved:ids";
const EVT = "saved:changed";

function readIds(): Set<string> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

export function useSaved() {
  const [ids, setIds] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    setIds(readIds());
  }, []);

  useEffect(() => {
    const onChanged = () => setIds(readIds());
    window.addEventListener(EVT, onChanged);
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setIds(readIds());
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(EVT, onChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const write = (next: Set<string>) => {
    localStorage.setItem(KEY, JSON.stringify(Array.from(next)));
    window.dispatchEvent(new Event(EVT));
  };

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      write(next);
      return next;
    });
  }, []);

  const isSaved = useCallback((id: string) => ids.has(id), [ids]);

  const items: Property[] = useMemo(
    () => allProperties.filter((p) => ids.has(p.id)),
    [ids]
  );

  return { ids, items, count: ids.size, isSaved, toggle };
}
