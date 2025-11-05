"use client";

import Image from "next/image";
import React from "react";

export const StepsSection = () => {
  return (
    <section className="w-full px-6 md:px-20 py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold">
            Get Your Ideal Property in 3 Simple Steps
          </h2>
          <div className="space-y-6 text-sm md:text-base">
            <div data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                1. Explore Options
              </h3>
              <p className="text-gray-600">
                Browse curated listings and discover apartments or land that
                meet your needs and budget.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                2. Book a Visit
              </h3>
              <p className="text-gray-600">
                Schedule a physical inspection with the assigned agent or
                property owner.
              </p>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-lg font-semibold mb-1 text-gray-900">
                3. Lock it In
              </h3>
              <p className="text-gray-600">
                Once satisfied, make a secure payment to finalize the deal.
              </p>
            </div>
          </div>
        </div>

        <div
          className="w-full h-[300px] sm:h-[400px] relative rounded-xl overflow-hidden shadow-lg"
          data-aos="fade-left"
        >
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Modern apartment complex"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mt-12 text-center" data-aos="zoom-in">
        <button
          onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
          className="px-6 py-3 bg-[#090040] text-white rounded-full hover:bg-opacity-90 transition"
        >
          Start Exploring Properties
        </button>
      </div>
    </section>
  );
};
