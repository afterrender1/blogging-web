"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

// Theme colors from the vintage palette
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const ACCENT_TEAL = "#119188";
const BASE_URI = "https://blogging-web-production.up.railway.app"; // Assuming this is your API base

const SignupComponent = () => {
    const router = useRouter();

    // State to manage form input
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // State for UI feedback
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleBack = () => {
        router.back();
    };

    // Universal handler for input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError(null);
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = formData;

        const signup = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const sendData = await fetch(`${BASE_URI}/api/auth/signup`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: name,
                        email: email,
                        password: password,
                    }),
                });

                const res = await sendData.json();
                if (!sendData.ok) {
                    const errorMessage = res.message || 'Signup failed. Please try again.';
                    throw new Error(errorMessage);
                }

                console.log("Signup Successful:", res);
                // Redirect user to the login page after successful signup
                router.push('/signin?signupSuccess=true');

            } catch (err) {
                console.error("Signup Error:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        signup();
    };


    return (
        <>
            {/* Background and Back Button Layout */}
            <div className="min-h-screen pt-10 sm:pt-0 flex flex-col" style={{ backgroundColor: WARM_CREAM }}>

                {/* Back Button Area */}
                <div className="max-w-md mx-auto w-full px-4 sm:px-0 mb-4 sm:mb-0 pt-4">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center cursor-pointer gap-1 text-sm uppercase font-medium transition hover:opacity-80"
                        style={{ color: DEEP_CHARCOAL }}
                        disabled={isLoading}
                    >
                        <ChevronLeft size={18} />
                        <span className="mt-0.5">Back</span>
                    </button>
                </div>

                {/* Main Form Centering Container */}
                <div className="grow flex items-start sm:items-center justify-center px-4 pb-12 sm:pb-0">

                    {/* Form Card */}
                    <div className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 sm:p-10 border-t-8" style={{ borderColor: ACCENT_TEAL }}>

                        {/* Heading */}
                        <h2 className="text-3xl font-serif font-light text-center mb-10" style={{ color: DEEP_CHARCOAL }}>
                            Create Your Account
                        </h2>

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: DEEP_CHARCOAL }}>
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#119188] focus:border-[#119188] transition bg-white text-base"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: DEEP_CHARCOAL }}>
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#119188] focus:border-[#119188] transition bg-white text-base"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Password Input */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: DEEP_CHARCOAL }}>
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#119188] focus:border-[#119188] transition bg-white text-base"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            {/* Error Message Display */}
                            {error && (
                                <p className="text-center text-sm font-medium p-3 rounded-lg border border-red-300" style={{ color: DEEP_CHARCOAL, backgroundColor: '#fdebeb' }}>
                                    {error}
                                </p>
                            )}

                            {/* Submission Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 rounded-lg text-white font-semibold tracking-wide uppercase transition shadow-md flex items-center justify-center gap-2
                                    ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-95'}`}
                                style={{ backgroundColor: ACCENT_TEAL }}
                            >
                                {isLoading ? (
                                    <>
                                        <ChevronLeft size={18} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Sign UP'
                                )}
                            </button>
                        </form>

                        {/* Sign In Link (Moved and styled for better placement) */}
                        <div className="mt-8 text-center text-sm" style={{ color: DEEP_CHARCOAL }}>
                            Already have an account?{' '}
                            <span
                                className="font-medium cursor-pointer hover:underline"
                                style={{ color: ACCENT_TEAL }}
                                onClick={() => router.push('/signin')}
                            >
                                Sign In
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignupComponent;