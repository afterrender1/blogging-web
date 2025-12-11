"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "All Blogs", href: "/all-blog-posts" },
  { name: "About Us", href: "/about" },
  { name: "Categories", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 p-2 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/">
              <Image
                src="/logo/brand-logo.png"
                alt="Daily World Blog"
                width={170}
                height={90}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative text-gray-700 font-medium text-base py-2 hover:text-[#124734] transition-colors group"
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#124734] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className="text-gray-600 font-medium text-sm px-4 py-2 rounded-lg hover:text-[#124734] transition"
            >
              Sign In
            </Link>
            <Link
              href="/"
              className="bg-[#124734] text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-[#0e3a2a] transition shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gray-100 bg-white ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-5 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[#124734] transition"
            >
              {item.name}
            </Link>
          ))}

          <div className="pt-4 space-y-3 border-t border-gray-200">
            <Link
              href="/signin"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-base font-semibold text-white bg-[#124734] rounded-lg hover:bg-[#0e3a2a] shadow-md transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
