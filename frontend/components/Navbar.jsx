"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, LogOut, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "@/redux/features/auth/authSlice";

// --- Configuration ---
const BASE_URI = "https://blogging-web-production.up.railway.app";
const ACCENT_COLOR = "#124734"; // Centralized the primary color for consistency
const HOVER_ACCENT = "#0e3a2a";

const navItems = [
  { name: "All Blogs", href: "/all-blog-posts" },
  { name: "About Us", href: "/about" },
  { name: "Categories", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // --- Authentication Logic ---
  const getUser = async () => {
    setIsCheckingSession(true);
    try {
      const res = await fetch(`${BASE_URI}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
          // dispatch(checkUser(data.user));
        } else {
          setUser(null);
          // dispatch(checkUser(null));
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("User fetch error:", error);
      setUser(null);
    } finally {
      setIsCheckingSession(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BASE_URI}/api/auth/signout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setIsOpen(false);
    }
  }

    

  // --- Render Logic ---
  const loadingState = (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-4 bg-gray-200 rounded-lg animate-pulse hidden md:block" />
      <div className="w-20 h-10 bg-gray-300 rounded-lg animate-pulse hidden md:block" />
    </div>
  );

  const authButtons = isCheckingSession ? loadingState : (
    user ? (
      <>
        {/* User Profile Link (Desktop) */}
        <Link
          href="/profile"
          className={`text-gray-600 font-medium text-sm px-4 py-2 rounded-lg border border-transparent hover:border-gray-200 hover:text-[${ACCENT_COLOR}] transition flex items-center gap-1.5`}
          title="View Profile"
        >
          <User size={18} />
          {user.username}
        </Link>
        {/* Logout Button (Desktop) - FIXED: Changed text-black to text-white */}

      </>
    ) : (
      <>
        {/* Sign Up Link (Desktop) */}
        <Link
          href="/signup"
          className={`text-gray-600 font-medium text-sm px-4 py-2 rounded-lg hover:text-[${ACCENT_COLOR}] transition`}
        >
          Sign Up
        </Link>
        {/* Sign In Button (Desktop) */}
        <Link
          href="/signin"
          className={`bg-[${ACCENT_COLOR}] text-gray-600 font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-[${HOVER_ACCENT}] transition`}
        >
          Sign In
        </Link>
      </>
    )
  );

  const mobileAuthLinks = isCheckingSession ? (
    <div className="pt-4 space-y-3 border-t border-gray-200 flex justify-center py-2">
      <Loader2 className="animate-spin text-gray-500" size={24} />
    </div>
  ) : (
    user ? (
      <div className="pt-4 space-y-3 border-t border-gray-200">
        {/* Profile Link (Mobile) */}
        <Link
          href="/profile"
          onClick={() => setIsOpen(false)}
          className={`flex items-center gap-2 px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[${ACCENT_COLOR}] transition`}
        >
          <User size={18} />
          {user.username} (Profile)
        </Link>
        {/* Logout Button (Mobile) */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-4 py-3 text-base font-medium text-red-600 rounded-lg hover:bg-gray-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    ) : (
      <div className="pt-4 space-y-3 border-t border-gray-200">
        {/* Sign In Link (Mobile) */}
        <Link
          href="/signin"
          onClick={() => setIsOpen(false)}
          className={`block w-full text-center py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[${ACCENT_COLOR}] transition`}
        >
          Sign In
        </Link>
        {/* Sign Up Link (Mobile) */}
        <Link
          href="/signup"
          onClick={() => setIsOpen(false)}
          className={`block w-full text-center py-3 text-base font-semibold text-white bg-[${ACCENT_COLOR}] rounded-lg hover:bg-[${HOVER_ACCENT}] shadow-md transition`}
        >
          Sign Up
        </Link>
      </div>
    )
  );

  return (
    <nav className="bg-[#F8F9F8] border-b border-gray-100 p-2 sticky top-0 z-50 shadow-sm">
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
                className={`relative text-gray-700 font-medium text-base py-2 hover:text-[${ACCENT_COLOR}] transition-colors group`}
              >
                {item.name}
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-[${ACCENT_COLOR}] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </Link>
            ))}
          </div>

          {/* Desktop Buttons (Now includes the flicker fix and UI fix) */}
          <div className="hidden md:flex items-center space-x-4">
            {authButtons}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 border-t border-gray-100 bg-white ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 py-5 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-gray-50 hover:text-[${ACCENT_COLOR}] transition`}
            >
              {item.name}
            </Link>
          ))}

          {/* Mobile Auth Links */}
          {mobileAuthLinks}
        </div>
      </div>
    </nav>
  );
}