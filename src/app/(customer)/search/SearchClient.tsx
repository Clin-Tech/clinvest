"use client";

import PropertyCard from "@/customer/components/PropertyCard";
import type { Property } from "@/types/property";
import Link from "next/link";

export default function SearchClient({
  items,
}: {
  items: readonly Property[];
}) {
  const count = items.length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Search Results {count ? `(${count})` : ""}
      </h1>

      {count === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No properties match your search.{" "}
          <Link href="/" className="underline">
            Back to homepage
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
