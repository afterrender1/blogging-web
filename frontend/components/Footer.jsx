"use client";

import React from "react";
import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const PRIMARY_DARK = "#0a3d3a";
const ACCENT_TEAL = "#37e7a0";

export default function Footer() {
    return (
        <footer
            className="w-full text-white"
            style={{ backgroundColor: PRIMARY_DARK }}
        >
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row justify-between gap-8">
                {/* Logo / Branding */}
                <div className="flex flex-col gap-4">
                            <div className="shrink-0">
            <Link href="/">
              <Image
                src="/logo/brand-logo.png"
                alt="Daily World Blog"
                width={170}
                height={90}
                className="h-10 w-auto rounded object-contain"
                priority
              />
            </Link>
          </div>
                    <p className="max-w-xs text-gray-300">
                        Your daily dose of global news, stories, and insights. Stay informed,
                        stay inspired.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-white">Company</h3>
                        <Link href="/about" className="text-gray-300 hover:text-[#37e7a0] transition">
                            About Us
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-[#37e7a0] transition">
                            Careers
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-[#37e7a0] transition">
                            Contact
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-white">Resources</h3>
                        <Link href="/all-blog-posts" className="text-gray-300 hover:text-[#37e7a0] transition">
                            Blog
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-[#37e7a0] transition">
                            Help Center
                        </Link>
                        <Link href="#" className="text-gray-300 hover:text-[#37e7a0] transition">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-white">Follow Us</h3>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-[#37e7a0] transition">
                            <Facebook size={24} />
                        </Link>
                        <Link href="#" className="hover:text-[#37e7a0] transition">
                            <Twitter size={24} />
                        </Link>
                        <Link href="#" className="hover:text-[#37e7a0] transition">
                            <Instagram size={24} />
                        </Link>
                        <Link href="#" className="hover:text-[#37e7a0] transition">
                            <Linkedin size={24} />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Daily World. All rights reserved.
            </div>
        </footer>
    );
}
