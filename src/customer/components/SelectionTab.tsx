"use client";

import CustomButton from "@/shared/CustomButton";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { track } from "./analytics";

type Filters = {
  location: string;
  bedroom: string;
  minPrice: string;
  maxPrice: string;
};

const TABS = [
  { id: "Shortlet", label: "Shortlet" },
  { id: "Rent", label: "Rent" },
  { id: "Sale", label: "Sale" },
  { id: "Land", label: "Land" },
] as const;

export default function SelectionTab() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]["id"]>("Shortlet");

  const [filters, setFilters] = useState<Filters>({
    location: "",
    bedroom: "",
    minPrice: "",
    maxPrice: "",
  });

  const filterControls: Array<{
    id: keyof Filters;
    label: string;
    options: string[];
    placeholder: string;
  }> = [
    {
      id: "location",
      label: "Location",
      options: ["Lagos", "Abuja", "Port Harcourt"],
      placeholder: "Search Location",
    },
    {
      id: "bedroom",
      label: "Bedroom",
      options: [
        "1 Bedroom",
        "2 Bedrooms",
        "3 Bedrooms",
        "4 Bedrooms",
        "5+ Bedrooms",
      ],
      placeholder: "Number of Bedroom",
    },
    {
      id: "minPrice",
      label: "Min Price",
      options: [
        "₦500,000",
        "₦750,000",
        "₦1,000,000",
        "₦1,500,000",
        "₦2,000,000",
      ],
      placeholder: "Select Min",
    },
    {
      id: "maxPrice",
      label: "Max Price",
      options: [
        "₦2,000,000",
        "₦4,000,000",
        "₦6,000,000",
        "₦8,000,000",
        "₦10,000,000",
      ],
      placeholder: "Select Max",
    },
  ];

  const handleSearch = () => {
    const q = new URLSearchParams();
    q.set("type", activeTab);
    (Object.entries(filters) as Array<[keyof Filters, string]>).forEach(
      ([k, v]) => {
        if (v) q.set(k, v);
      }
    );
    track("search_submitted", { type: activeTab, ...filters });
    router.push(`/search?${q.toString()}`);
  };

  return (
    <div className="w-[80%] flex flex-col items-center pt-10">
      <div className="w-full md:w-1/2 flex items-center justify-between py-2 px-3 rounded-t-lg bg-white">
        {TABS.map((tab) => (
          <CustomButton
            key={tab.id}
            handleBtnClick={() => setActiveTab(tab.id)}
            btnClassName={`!py-2 md:!py-3 !px-1 md:!px-4 !w-[24%] !shadow-none ${activeTab === tab.id ? "!bg-[#090040] text-white !text-sm md:!text-md " : "bg-white"}`}
          >
            {tab.label}
          </CustomButton>
        ))}
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4 p-4 bg-white rounded-b-lg md:rounded-3xl shadow-md">
        {filterControls.map((fc) => (
          <div key={fc.id} className="min-w-0 col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fc.label}
            </label>

            <div className="relative">
              <select
                className="block w-full min-w-0 text-xs sm:text-sm text-gray-600 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02AD7] focus:border-[#A02AD7] appearance-none leading-5 pr-9"
                value={filters[fc.id]}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, [fc.id]: e.target.value }))
                }
                disabled={fc.id === "maxPrice" && !filters.minPrice}
              >
                <option value="">{fc.placeholder}</option>
                {fc.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>

              <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm">
                ▾
              </span>
            </div>
          </div>
        ))}

        <div className="col-span-1 sm:col-span-2 lg:col-span-1 flex items-end">
          <CustomButton
            handleBtnClick={handleSearch}
            btnClassName="!w-full sm:!w-auto !bg-[#A02AD7] !text-white !px-4 !py-2 !rounded-lg !shadow-md hover:!scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaSearch className="text-white" size={12} />
            Search
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
