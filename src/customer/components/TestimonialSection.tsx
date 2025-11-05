"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Clinvest helped us secure a place faster than we imagined. Their listings are top-notch!",
    name: "Ademola Group",
    company: "Ademola Holdings",
  },
  {
    quote:
      "We got our dream shortlet apartment through Clinvest in just 3 days. Amazing platform!",
    name: "Olivia Suites",
    company: "Olivia & Co",
  },
  {
    quote:
      "Finding commercial space has always been tough, but Clinvest made it seamless.",
    name: "Landmark Developers",
    company: "Landmark Intl",
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="w-full bg-gray-200 text-center py-20">
      <p className="text-[#090040] font-medium">Testimonials</p>
      <h2 className="text-2xl font-bold mt-2 mb-6">
        Why People Trust ClinVest
      </h2>

      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full flex flex-col items-center justify-center"
      >
        <FaQuoteLeft size={30} className="mx-auto mb-4 text-gray-400" />
        <p className="w-[85%] flex items-center justify-center text-gray-700 text-lg mb-3">
          {testimonials[currentIndex].quote}
        </p>
        <p className="font-semibold">{testimonials[currentIndex].name}</p>
        <p className="text-sm text-gray-500">
          {testimonials[currentIndex].company}
        </p>
      </motion.div>

      <div className="flex justify-center mt-6 gap-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full transition ${
              currentIndex === i ? "bg-[#090040]" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
