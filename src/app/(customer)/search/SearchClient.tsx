"use client";

import { useSearchParams } from "next/navigation";
import { allProperties } from "@/customer/utils/data";
import PropertyCard from "@/customer/components/PropertyCard";
import type { Property } from "@/types/property";

function matchesFilters(property: Property, params: URLSearchParams) {
  const type = (
    params.get("propertyType") ||
    params.get("type") ||
    ""
  ).toLowerCase();
  const loc = (params.get("location") || "").toLowerCase();
  const bed = params.get("bedroom");
  const min =
    parseInt((params.get("minPrice") || "").replace(/[₦,]/g, "")) || 0;
  const max =
    parseInt((params.get("maxPrice") || "").replace(/[₦,]/g, "")) ||
    999_999_999;

  const numericPrice = parseInt(property.price.replace(/[₦,]/g, "")) || 0;

  return (
    (!type || property.type.toLowerCase() === type) &&
    (!loc || property.location.toLowerCase().includes(loc)) &&
    (!bed || `${property.bedrooms ?? ""} Bedroom` === bed) &&
    numericPrice >= min &&
    numericPrice <= max
  );
}

export default function SearchClient() {
  const params = useSearchParams();

  const filtered = (allProperties as readonly Property[]).filter((p) =>
    matchesFilters(p, params)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">
        Search Results {filtered.length ? `(${filtered.length})` : ""}
      </h1>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No properties match your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
