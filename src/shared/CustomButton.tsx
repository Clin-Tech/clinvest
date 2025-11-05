"use client";

import React from "react";

type CustomButtonProps = {
  children?: string | React.ReactNode;
  btnClassName?: string;
  btnId?: number | string;
  handleBtnClick?: () => void;
  whileHover?: { scale: number };
  whileTap?: { scale: number };
};

const CustomButton = ({
  children = "Click",
  btnClassName = "",
  btnId = "",
  handleBtnClick,
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
}: CustomButtonProps) => {
  return (
    <button
      key={btnId}
      onClick={handleBtnClick}
      className={` ${btnClassName} text-[#090040] text-md font-medium bg-white px-3 py-2 rounded-lg shadow-md hover:scale-105 transition-all duration-300`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
