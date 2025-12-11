"use client";

import React, { useState } from "react"; // ADDED: useState for form state
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Theme colors from the vintage palette
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const ACCENT_TEAL = "#119188";
// const VINTAGE_ACCENT = "#996a3f"; // Not used directly in UI

const SigninComponent = () => {
    const router = useRouter();

    // ADDED: State to manage form input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleBack = () => {
        router.back(); // Navigate to the previous page in history
    };

    // ADDED: Universal handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // ADDED: Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        
console.log(formData);

     
    };


    return (
        <>
            {/* Back Button Container: Max-w must match the form (max-w-md) for perfect alignment */}
            <div className="max-w-md mx-auto pt-10 px-4 sm:px-0" style={{ backgroundColor: WARM_CREAM }}>
                <button
                    onClick={handleBack}
                    className="inline-flex items-center cursor-pointer gap-1 text-sm uppercase font-medium transition hover:opacity-80"
                    style={{ color: DEEP_CHARCOAL }}
                >
                    <ChevronLeft size={18} />
                    <span className="mt-0.5">Back</span>
                </button>
            </div>

            {/* Main Sign In Form Container */}
            <div className="min-h-screen flex items-start sm:items-center justify-center pt-8 sm:pt-0 px-4" style={{ backgroundColor: WARM_CREAM }}>
                {/* max-w-md ensures responsiveness and centering on large screens */}
                <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border-t-4" style={{ borderColor: ACCENT_TEAL }}>

                    {/* Heading */}
                    <h2 className="text-3xl font-serif font-light text-center mb-8" style={{ color: DEEP_CHARCOAL }}>
                        Sign In
                    </h2>

                    {/* Form: Submits data via handleSubmit */}
                    <form className="space-y-6" onSubmit={handleSubmit}>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: DEEP_CHARCOAL }}>
                                Name
                            </label>
                            <input
                                type="text"
                                name="name" // ADDED: name attribute for form data handling
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#119188] transition bg-white"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: DEEP_CHARCOAL }}>
                                Email
                            </label>
                            <input
                                type="email"
                                name="email" // ADDED: name attribute
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#119188] transition bg-white"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: DEEP_CHARCOAL }}>
                                Password
                            </label>
                            <input
                                type="password"
                                name="password" // ADDED: name attribute
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#119188] transition bg-white"
                                required
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