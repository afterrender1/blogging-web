"use client";

import React, { useState, useEffect } from 'react';
import { User, Mail, Loader2, AlertTriangle, LogOut } from 'lucide-react'; // Added LogOut icon
import { useRouter } from 'next/navigation';

// --- Configuration (Adjust as necessary) ---
const BASE_URI = "http://localhost:8000";
const DEEP_CHARCOAL = "#2d2a2a";
const ACCENT_TEAL = "#119188";
const WARM_CREAM = "#fcf9f3";

const Profile = () => {
    const router = useRouter();

    // State to hold user data fetched from the API
    const [user, setUser] = useState(null);
    // State for loading, error handling, and LOGOUT specific loading
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggingOut, setIsLoggingOut] = useState(false); // NEW: Dedicated state for logout button
    const [error, setError] = useState(null);

    // Function to fetch the logged-in user's details
    const getUser = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URI}/api/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            if (res.status === 401 || res.status === 403) {
                // If unauthorized/expired, redirect to login
                router.push('/');
                return;
            }

            if (!res.ok) {
                throw new Error("Failed to fetch user data.");
            }

            const data = await res.json();
            console.log("Logged in user:", data.user);
            setUser(data.user);

        } catch (err) {
            console.error("Profile Fetch Error:", err);
            setError(err.message || "An unexpected error occurred while loading your profile.");
        } finally {
            setIsLoading(false);
        }
    };

    // NEW: Function to handle user sign-out
    const handleLogout = async () => {
        setIsLoggingOut(true); // Disable button immediately
        try {
            await fetch(`${BASE_URI}/api/auth/signout`, {
                method: "POST",
                credentials: "include",
            });

            // On success, clear the user state and redirect to the login page
            setUser(null);
            router.push('/');

        } catch (error) {
            console.error("Logout error:", error);
            // Optionally set a temporary error message if logout fails
            setError("Logout failed. Please try clearing your browser cookies manually.");
        } finally {
            setIsLoggingOut(false);
        }
    }

    // useEffect hook to call getUser once on component mount
    useEffect(() => {
        getUser();
    }, []);

    // --- Render Logic ---

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: WARM_CREAM }}>
                <div className="flex items-center gap-3 text-lg font-medium" style={{ color: DEEP_CHARCOAL }}>
                    <Loader2 className="animate-spin" size={24} />
                    Loading Profile...
                </div>
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: WARM_CREAM }}>
                <div className="max-w-md w-full p-8 rounded-xl shadow-lg border border-red-300 bg-white">
                    <div className="flex items-center gap-3 text-red-600 mb-4">
                        <AlertTriangle size={24} />
                        <h3 className="text-xl font-semibold">Error</h3>
                    </div>
                    <p className="text-sm" style={{ color: DEEP_CHARCOAL }}>{error}</p>
                    <button
                        onClick={getUser}
                        className="mt-4 w-full py-2 rounded-lg text-white font-semibold transition hover:opacity-90"
                        style={{ backgroundColor: ACCENT_TEAL }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Default render for successful data fetch
    return (
        <div className="min-h-screen flex items-center justify-center pt-8 sm:pt-0 px-4" style={{ backgroundColor: WARM_CREAM }}>
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border-t-4" style={{ borderColor: ACCENT_TEAL }}>

                {/* Header */}
                <h2 className="text-3xl font-serif font-light text-center mb-6" style={{ color: ACCENT_TEAL }}>
                    My Profile
                </h2>

                {/* User Info Card */}
                {user ? (
                    <div className="space-y-4 pt-4">
                        {/* Name/Username */}
                        <div className="flex items-center p-3 rounded-lg border" style={{ borderColor: DEEP_CHARCOAL, color: DEEP_CHARCOAL }}>
                            <User size={20} className="mr-3 text-gray-500" />
                            <div className='flex flex-col'>
                                <span className="text-xs uppercase font-medium text-gray-500">Username</span>
                                <span className="text-lg font-semibold">{user.username || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center p-3 rounded-lg border" style={{ borderColor: DEEP_CHARCOAL, color: DEEP_CHARCOAL }}>
                            <Mail size={20} className="mr-3 text-gray-500" />
                            <div className='flex flex-col'>
                                <span className="text-xs uppercase font-medium text-gray-500">Email Address</span>
                                <span className="text-lg font-semibold">{user.email || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Temporary error display for failed logout */}
                        {error && (
                            <p className="text-center text-sm p-2 rounded-lg text-red-700 bg-red-100 border border-red-300">
                                {error}
                            </p>
                        )}

                    </div>
                ) : (
                    <p className="text-center text-sm" style={{ color: DEEP_CHARCOAL }}>
                        Could not retrieve profile data. Please ensure you are logged in.
                    </p>
                )}

                {/* Logout Button (NOW calls the API) */}
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className={`mt-8 w-full py-3 rounded-lg text-white font-semibold tracking-wide uppercase transition flex items-center justify-center gap-2 ${isLoggingOut ? 'opacity-60 cursor-not-allowed' : 'hover:opacity-90'}`}
                    style={{ backgroundColor: DEEP_CHARCOAL }}
                >
                    {isLoggingOut ? (
                        <>
                            <Loader2 className="animate-spin" size={20} />
                            Signing Out...
                        </>
                    ) : (
                        <>
                            <LogOut size={20} />
                            Log Out
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default Profile;