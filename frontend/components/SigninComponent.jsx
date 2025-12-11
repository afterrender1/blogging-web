"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { ChevronLeft } from "lucide-react"; // Import icon

// Theme colors from the vintage palette
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const ACCENT_TEAL = "#119188";
const VINTAGE_ACCENT = "#996a3f"; // Although not used directly here, useful for context

const SigninComponent = () => {
    const router = useRouter();

    const handleBack = () => {
        router.back(); // Navigate to the previous page in history
    };

    return (
        <>
            {/* Back Button Container */}
            {/* Max-w is set to match the form width for alignment */}
            <div className="max-w-4xl mx-auto pt-10 px-4" style={{ backgroundColor: WARM_CREAM }}>
                <button
                    onClick={handleBack}
                    className="inline-flex items-center cursor-pointer gap-1 text-sm uppercase font-medium transition hover:opacity-80"
                    style={{ color: DEEP_CHARCOAL }}
                >
                    <ChevronLeft size={18} />
                    <span className="mt-0.5">Back</span>
                </button>
            </div>

            <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: WARM_CREAM }}>
                <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border-t-4" style={{ borderColor: ACCENT_TEAL }}>

                    {/* Heading */}
                    <h2 className="text-3xl font-serif font-light text-center mb-8" style={{ color: DEEP_CHARCOAL }}>
                        Sign In
                    </h2>

                    {/* Form */}
                    <form className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: DEEP_CHARCOAL }}>
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#119188] transition bg-white"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: DEEP_CHARCOAL }}>
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#119188] transition bg-white"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: DEEP_CHARCOAL }}>
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#119188] transition bg-white"
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg text-white font-semibold tracking-wide uppercase transition hover:opacity-90"
                            style={{ backgroundColor: ACCENT_TEAL }}
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>

        </>
    );
};

export default SigninComponent;