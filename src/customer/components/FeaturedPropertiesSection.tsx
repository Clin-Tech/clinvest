"use client";

import { useState } from "react";
import { allProperties } from "@/customer/utils/data";
import PropertyCard from "@/customer/components/PropertyCard";
import { Property } from "@/types/property";

const TABS: Array<Property["type"]> = ["Rent", "Sale", "Shortlet", "Land"];

export default function FeaturedPropertiesSection() {
  const [activeTab, setActiveTab] = useState<Property["type"]>("Rent");

  // const filtered = allProperties.filter(
  //   (p: any): p is Property => p && p.type === activeTab
  // ) as Property[];
  const filtered = allProperties.filter((p) => p.type === activeTab);

  return (
    <section className="w-full px-6 md:px-20 py-10 bg-[#090040] text-white">
      <h2 className="text-lg font-medium mb-1">ClinVest Picks</h2>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Featured Properties
      </h1>

      <div className="flex gap-8 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`pb-1 text-sm font-medium border-b-2 transition-all duration-200 ${
              activeTab === tab
                ? "border-white text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <PropertyCard key={p.id} property={p} />
        ))}
      </div>
    </section>
  );
}
