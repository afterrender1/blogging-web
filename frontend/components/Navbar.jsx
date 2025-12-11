"use client";

import React, { useState } from "react";
import Link from "next/link";
// Image import kept optional, but removed its use to simplify the logo structure
import { Menu, X } from "lucide-react"; // Using lucide icons (recommended)

// Consistent list of primary navigation items
const navItems = [
  { name: "Developer", href: "/developer" },
  { name: "Webinar", href: "/webinar" },
  { name: "Pricing", href: "/pricing" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo - Left: Consistent spacing and clear branding */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <span className="text-xl font-extrabold text-gray-900 tracking-tight">SoftQA</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center: Removed unnecessary md:items-center */}
          <div className="hidden md:flex md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-teal-600 font-medium text-base transition-colors duration-200 py-2" // Added py-2 for better hit area
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons - Right: Cleaned button classes */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-teal-600 font-medium text-sm px-3 py-2 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/get-started"
              className="bg-teal-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-200 shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button (Hamburger) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-150"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel: Conditional rendering with the isOpen state */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100" id="mobile-menu">
          <div className="px-2 pt-3 pb-4 space-y-1">
            {/* Primary Nav Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMenu} // Use dedicated close function
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition duration-200"
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Buttons/CTA */}
            <div className="pt-4 space-y-3 border-t border-gray-100">
              <Link
                href="/signin"
                onClick={closeMenu}
                className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50 rounded-lg transition duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/get-started"
                onClick={closeMenu}
                className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition duration-200 shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;