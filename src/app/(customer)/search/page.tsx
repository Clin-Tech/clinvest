"use client";

import { useSearchParams } from "next/navigation";
import { allProperties } from "@/customer/utils/data";
import PropertyCard from "@/customer/components/PropertyCard";
import { Property } from "@/types/property";
import React, { useMemo } from "react";
import Link from "next/link";

/** util: strip everything except digits */
const moneyToNumber = (v: string | number | undefined): number => {
  if (v == null) return 0;
  if (typeof v === "number") return v;
  const onlyDigits = v.replace(/[^\d]/g, "");
  return onlyDigits ? parseInt(onlyDigits, 10) : 0;
};

function matchesFilters(property: Property, params: URLSearchParams) {
  // Category from tabs
  const category = params.get("category"); // Rent|Sale|Shortlet|Land

  // Other filters
  const loc = params.get("location")?.trim();
  const bed = params.get("bedroom")?.trim(); // "3 Bedrooms" | "5+ Bedrooms"
  const min = moneyToNumber(params.get("minPrice") || undefined);
  const max = moneyToNumber(params.get("maxPrice") || undefined);

  // Category (exact, case-insensitive)
  if (category && property.type.toLowerCase() !== category.toLowerCase()) {
    return false;
  }

  // Location (substring)
  if (loc && !property.location.toLowerCase().includes(loc.toLowerCase())) {
    return false;
  }

  // Bedrooms
  if (bed) {
    if (bed.includes("+")) {
      // "5+ Bedrooms"
      const minBed = parseInt(bed, 10);
      if (!property.bedrooms || property.bedrooms < minBed) return false;
    } else {
      // "2 Bedrooms" | "1 Bedroom"
      const exact = parseInt(bed, 10);
      if (!property.bedrooms || property.bedrooms !== exact) return false;
    }
  }

  // Price range using numeric form of property.price (handles "₦x / year" etc.)
  const numericPrice = moneyToNumber(property.price);
  if (min && numericPrice < min) return false;
  if (max && numericPrice > max) return false;

  return true;
}

const SearchPage = () => {
  const params = useSearchParams();

  const filtered = useMemo(
    () => allProperties.filter((p) => matchesFilters(p as Property, params)),
    [params]
  ) as Property[];

  // Build a small “pill” summary from query for UX
  const summary: string[] = [];
  const cat = params.get("category");
  if (cat) summary.push(cat);
  const loc = params.get("location");
  if (loc) summary.push(loc);
  const bed = params.get("bedroom");
  if (bed) summary.push(bed);
  const min = params.get("minPrice");
  const max = params.get("maxPrice");
  if (min || max) summary.push([min || "₦0", max || "∞"].join(" – "));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
        <h1 className="text-xl sm:text-2xl font-bold">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {summary.length ? " · " : ""}
          {summary.join(" · ")}
        </h1>
        <Link
          href="/search"
          className="text-sm text-[#A02AD7] underline underline-offset-4"
        >
          Clear filters
        </Link>
      </div>

      {filtered.length === 0 ? (
        <div className="h-[40vh] grid place-items-center">
          <div className="text-center">
            <p className="text-lg font-medium">No property found</p>
            <p className="text-gray-500 text-sm mt-1">
              Try broadening your filters or{" "}
              <Link
                href="/"
                className="text-[#A02AD7] underline underline-offset-4"
              >
                go back home
              </Link>
              .
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
