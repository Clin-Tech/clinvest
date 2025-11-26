"use client";
import Link from "next/link";
import { useSaved } from "@/hooks/useSaved";

export default function SavedNavButton() {
  const { count } = useSaved();
  return (
    <Link href="/saved" className="relative inline-flex items-center">
      <span className="text-sm">Saved</span>
      {count > 0 && (
        <span
          className="ml-2 inline-flex items-center justify-center
          text-xs w-5 h-5 rounded-full bg-pink-600 text-white"
        >
          {count}
        </span>
      )}
    </Link>
  );
}
