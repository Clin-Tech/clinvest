import React from "react";
import { FaHouseChimney } from "react-icons/fa6";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 text-white">
      <FaHouseChimney className="text-white text-3xl" />
      <p className="text-2xl font-bold">ClinVest</p>
    </div>
  );
};

export default Logo;
