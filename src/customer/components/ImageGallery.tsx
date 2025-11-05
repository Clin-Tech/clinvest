"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageGalleryProps {
  image: string;
}

const EXTRA_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613977257363-707ba934822a?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1740&auto=format&fit=crop",
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ image }) => {
  const [extra, setExtra] = useState<string[]>([]);

  useEffect(() => {
    const random = shuffleArray(EXTRA_IMAGES).slice(0, 3);
    setExtra(random);
  }, []);

  const allImages = [image, ...extra];

  return (
    <div className="flex flex-col lg:flex-row gap-2 overflow-x-auto">
      <div className="w-full lg:w-2/3 h-[450px] rounded-xl overflow-hidden">
        <Image
          src={allImages[0]}
          alt="Main"
          className="w-full h-full object-cover"
          width={1740}
          height={450}
          priority
          loading="eager"
          unoptimized
        />
      </div>

      {/* Sub Images */}
      <div className="w-full lg:w-1/3 h-fit lg:h-[450px] flex lg:flex-col gap-2">
        {allImages.slice(1).map(
          (img, i) =>
            img && (
              <div
                key={i}
                className="h-[250px] flex-1 rounded-xl overflow-hidden"
              >
                <Image
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                  width={1740}
                  height={250}
                  loading="lazy"
                  unoptimized
                />
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
