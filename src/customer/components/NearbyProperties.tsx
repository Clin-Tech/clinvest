"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { allProperties } from "../utils/data";

export type PropertySummary = {
  id: string;
  title: string;
  location?: string;
  price?: string;
  image?: string;
  type?: string;
};

type NearbyProps = {
  currentId: string;
  location?: string;
  limit?: number;
};

const NearbyProperties: React.FC<NearbyProps> = ({
  currentId,
  location,
  limit = 3,
}) => {
  const nearby = allProperties
    .filter(
      (p) =>
        p.id !== currentId &&
        location &&
        p.location?.toLowerCase().includes(location.toLowerCase())
    )
    .slice(0, limit);

  const fallback = allProperties
    .filter((p) => p.id !== currentId)
    .slice(0, limit);

  const listToShow = nearby.length > 0 ? nearby : fallback;

  return (
    <div className="rounded-xl border bg-white pt-4 shadow-sm">
      <h3 className="px-4 text-lg font-semibold">Nearby Properties</h3>
      <p className="px-4 text-sm text-gray-500 mb-4">
        Other listings you may want to check
      </p>

      <div className="grid grid-cols-1 px-4 gap-3">
        {listToShow.map((p) => (
          <Link
            key={p.id}
            href={`/property/${p.id}`}
            className="flex items-center gap-3 rounded-md p-2 hover:bg-gray-50"
          >
            <div className="w-20 h-14 relative rounded overflow-hidden bg-gray-100">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
            </div>

            <div className="flex-1">
              <div className="text-sm font-medium line-clamp-2">{p.title}</div>
              <div className="text-xs text-gray-500">{p.location}</div>
            </div>

            <div className="text-sm font-semibold text-[#090040]">
              {p.price}
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/sale"
        className="block text-center mt-4 text-sm text-[#090040] w-full py-3 body shadow-lg bg-zinc-200"
      >
        View all properties
      </Link>
    </div>
  );
};

export default NearbyProperties;
