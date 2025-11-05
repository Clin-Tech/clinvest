"use client";
import CustomButton from "@/shared/CustomButton";
import Logo from "@/shared/Logo";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [clickedNav, setClickedNav] = useState("");

  const navLinks = [
    { label: "Shortlet", href: "/shortlet" },
    { label: "Rent", href: "/rent" },
    { label: "Sale", href: "/sale" },
    { label: "Land", href: "/land" },
  ];

  return (
    <header className="w-full bg-[#090040] py-3 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4 lg:px-20">
        {/* Mobile Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setClickedNav(link.label);
              }}
              className={`text-sm font-medium hover:text-[#A02AD7] transition ${clickedNav === link.label ? "text-[#A02AD7] border-b border-b-white" : "text-inherit"} `}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="flex items-center">
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Logo />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-[#A02AD7] transition"
          >
            Login
          </Link>
          <CustomButton btnClassName="bg-white text-[#090040] text-sm font-medium px-4 py-2 rounded-lg hover:scale-105 transition">
            Sign Up
          </CustomButton>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="lg:hidden px-6 pb-4 flex flex-col gap-4 bg-[#090040]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-[#A02AD7]"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="text-sm font-medium hover:text-[#A02AD7]"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <CustomButton
            btnClassName="bg-white text-[#090040] text-sm font-medium px-4 py-2 rounded-lg hover:scale-105 transition"
            handleBtnClick={() => setIsOpen(false)}
          >
            Sign Up
          </CustomButton>
        </div>
      )}
    </header>
  );
};

export default Header;
