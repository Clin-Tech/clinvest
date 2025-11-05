"use client";

import { FaTools, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import CustomButton from "@/shared/CustomButton";

const MotionCustomButton = motion(CustomButton);

const services = [
  {
    icon: <FaHome size={32} className="text-[#090040]" />,
    title: "Property Leasing",
    description:
      "We assist clients in finding the right tenants or leasing opportunities for their residential and commercial properties, handling documentation and inspection.",
  },
  {
    icon: <FaTools size={32} className="text-[#090040]" />,
    title: "Renovation & Upgrades",
    description:
      "From interior improvements to exterior facelifts, we manage renovations that enhance your property’s market value and livability.",
  },
];

export default function OurServicesSection() {
  return (
    <section className="w-full bg-[#090040] text-white py-16 px-6 sm:px-12">
      <div className="max-w-[1200px] mx-auto flex flex-col items-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-200 text-black rounded-2xl p-6 flex flex-col gap-4 shadow-md"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div>{service.icon}</div>
              <h3 className="text-lg font-semibold text-[#090040]">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <MotionCustomButton
          btnClassName="mt-12 !bg-gray-200 text-[#090040] px-6 py-2 rounded-full font-medium hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View More
        </MotionCustomButton>
      </div>
    </section>
  );
}
