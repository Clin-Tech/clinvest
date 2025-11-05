"use client";

import { allProperties } from "@/customer/utils/data";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import PropertyCard from "@/customer/components/PropertyCard";
import AdsCarousel from "@/customer/components/AdsCarousel";

const Shortlet = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full px-6 md:px-20 py-10 text-white"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {allProperties
            .filter((p) => p.type === "Shortlet")
            .map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyCard property={p} />
              </motion.div>
            ))}
        </motion.div>
      </AnimatePresence>

      <div className="w-full my-10 pt-10">
        <AdsCarousel />
      </div>
    </motion.section>
  );
};

export default Shortlet;
