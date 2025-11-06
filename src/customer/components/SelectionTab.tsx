"use client";

import CustomButton from "@/shared/CustomButton";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

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
    router.push(`/search?${q.toString()}`);
  };

  return (
    <div className="w-[80%] flex flex-col items-center pt-10">
      <div className="w-full md:w-1/2 flex items-center justify-between py-2 px-3 rounded-t-lg bg-white">
        {TABS.map((tab) => (
          <CustomButton
            key={tab.id}
            handleBtnClick={() => setActiveTab(tab.id)}
            btnClassName={`!py-3 !px-4 !w-[24%] !shadow-none ${activeTab === tab.id ? "!bg-[#090040] text-white" : "bg-white"}`}
          >
            {tab.label}
          </CustomButton>
        ))}
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 p-4 bg-white rounded-b-lg rounded-t-none md:rounded-3xl shadow-md gap-x-4">
        {filterControls.map((fc) => (
          <div key={fc.id} className="w-[130px] sm:w-[200px] md:w-[160px] py-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fc.label}
            </label>
            <select
              className="w-full text-xs sm:text-sm text-grey p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A02AD7] focus:border-transparent"
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
          </div>
        ))}

        <div className="flex items-center justify-center">
          <CustomButton
            handleBtnClick={handleSearch}
            btnClassName="!bg-[#A02AD7] !text-white !px-4 !py-2 !rounded-lg !shadow-md hover:!scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <FaSearch className="text-white" size={12} />
            Search
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
