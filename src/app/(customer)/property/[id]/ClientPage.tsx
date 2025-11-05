"use client";

import ImageGallery from "@/customer/components/ImageGallery";
import AgentCard from "@/customer/components/AgentCard";
import NearbyProperties from "@/customer/components/NearbyProperties";
import ScheduleViewing from "@/customer/components/ScheduleViewing";
import { FaBath, FaBed, FaToilet } from "react-icons/fa";
import type { Property } from "@/types/property";

export default function ClientPage({ property }: { property: Property }) {
  return (
    <div className="px-4 py-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-2 flex flex-col gap-6">
        <ImageGallery image={property.image} />

        <div>
          <h1 className="text-2xl font-semibold">{property.title}</h1>
          <p className="text-gray-600">{property.location}</p>
          {property.description && (
            <p className="text-gray-800 mt-2">{property.description}</p>
          )}

          <div className="mt-4 flex gap-6 text-sm">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium">{property.type}</span>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-4 text-sm text-gray-700">
            <p className="flex items-center gap-1">
              <FaBed size={12} /> Bedrooms: {property.bedrooms ?? "N/A"}
            </p>
            <p className="flex items-center gap-1">
              <FaBath size={12} /> Bathrooms: {property.bathrooms ?? "N/A"}
            </p>
            <p className="flex items-center gap-1">
              <FaToilet size={12} /> Toilets: {property.toilets ?? "N/A"}
            </p>
          </div>
        </div>

        <ScheduleViewing />
      </div>

      <div className="sticky top-20 flex flex-col gap-6">
        <AgentCard property={property} />
        <NearbyProperties
          currentId={property.id}
          location={property.location}
        />
      </div>
    </div>
  );
}
