"use client";
import { useEffect, useState } from "react";

type ColorRange = {
  range: [number, number];
  class: string;
};

interface Props {
  textLine: string;
  className?: string;
  colorMap?: ColorRange[];
}

const AnimatedTextLine = ({ textLine, className, colorMap }: Props) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => (prev < textLine.length ? prev + 1 : prev));
    }, 40);

    return () => clearInterval(interval);
  }, [textLine]);

  const getColorForIndex = (i: number) => {
    if (!colorMap) return "text-white";

    for (const item of colorMap) {
      const [start, end] = item.range;
      if (i >= start && i <= end) return item.class;
    }
    return "text-white";
  };

  return (
    <p className={className}>
      {textLine.split("").map((char, i) => (
        <span
          key={i}
          className={`transition duration-200 ${
            i < visibleCount ? getColorForIndex(i) : "text-zinc-600"
          }`}
        >
          {char}
        </span>
      ))}
    </p>
  );
};

export default AnimatedTextLine;
