"use client";

import { FaBed, FaBath, FaToilet } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";

const PropertyCard = ({ property }: { property: Property }) => {
  if (!property) return null;
  const { title, location, price, bedrooms, bathrooms, toilets, id, image } =
    property;

  return (
    <Link href={`/property/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        <div className="relative w-full h-[200px]">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer text-gray-700 text-sm">
            ♡
          </div>
        </div>
        <div className="p-4 space-y-2">
          <h3 className="text-sm font-semibold leading-tight text-black">
            {title}
          </h3>
          <p className="text-xs text-gray-500">{location}</p>
          <p className="text-sm font-bold text-black">{price}</p>
          <div className="flex gap-4 text-xs text-gray-600">
            {!!bedrooms && (
              <div className="flex items-center gap-1">
                <FaBed size={12} /> {bedrooms} Bedroom{bedrooms > 1 ? "s" : ""}
              </div>
            )}
            {!!bathrooms && (
              <div className="flex items-center gap-1">
                <FaBath size={12} /> {bathrooms} Bathroom
                {bathrooms > 1 ? "s" : ""}
              </div>
            )}
            {!!toilets && (
              <div className="flex items-center gap-1">
                <FaToilet size={12} /> {toilets} Toilet{toilets > 1 ? "s" : ""}
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400">Property ID - {id}</p>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
