"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaBlog,
  FaConciergeBell,
  FaHome,
  FaImages,
  FaInfoCircle,
  FaSuitcase,
} from "react-icons/fa";

const menu = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "About Us", href: "/about-us", icon: FaInfoCircle },
  { label: "Hajj Packages", href: "/hajj-packages", icon: FaSuitcase },
  { label: "Services", href: "/services", icon: FaConciergeBell },
  { label: "Gallery", href: "/gallery", icon: FaImages },
  { label: "Blogs", href: "/blogs", icon: FaBlog },
];

const NavberClient = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Menu */}
      <div className="hidden md:flex items-center gap-6">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-1 font-semibold transition-colors ${
                isActive
                  ? "text-[#b88a00]"
                  : "text-[#222] hover:text-[#b88a00]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Contacts Us Button */}
      <div className="flex items-center">
        <Link
          href="/contact-us"
          className="hidden md:flex items-center gap-2 bg-[#b88a00] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#a07a00] transition-colors"
        >
          Contacts Us <FaArrowRight />
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden flex items-center p-2"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Open menu"
      >
        <FaBars className="w-6 h-6 text-[#0E595C]" />
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t px-4 pb-4 z-50">
          <div className="flex flex-col gap-2 mt-2">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 font-semibold py-2 px-2 rounded transition-colors ${
                    isActive
                      ? "text-[#b88a00] bg-[#f6f1e7]"
                      : "text-[#222] hover:text-[#b88a00]"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact-us"
              className="flex items-center gap-2 bg-[#b88a00] text-white font-semibold px-5 py-2 rounded-full hover:bg-[#a07a00] transition-colors mt-2 justify-center"
              onClick={() => setMobileOpen(false)}
            >
              Contacts Us <FaArrowRight />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavberClient;