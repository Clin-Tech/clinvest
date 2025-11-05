"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AdsCarousel1, AdsCarousel2 } from "../../../public/assets/images";

const banners = [AdsCarousel1, AdsCarousel2];

const AdsCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[200px] sm:h-[220px] rounded-xl shadow-lg overflow-hidden">
      {banners.map((banner, i) => (
        <Image
          key={i}
          src={banner}
          alt={`Ad ${i + 1}`}
          fill
          priority={i === 0}
          className={`object-cover object-center w-full h-full transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
};

export default AdsCarousel;
