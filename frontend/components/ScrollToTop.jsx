"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

// EXACT SAME PALETTE AS YOUR ENTIRE SITE
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const VINTAGE_ACCENT = "#996a3f";
const ACCENT_TEAL = "#119188";
const DARK_TEAL = "#0a3d3a";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Subtle fade + gentle rise animation
    const variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
    };

    if (!isVisible) return null;

    return (
        <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 hover:text-white right-6 md:right-10 z-50
                 flex items-center cursor-pointer justify-center
                 w-14 h-14 md:w-16 md:h-16
                 rounded-full
                 shadow-xl
                 border-2
                 "
            style={{
                backgroundColor: "white",
                borderColor: DEEP_CHARCOAL,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{
                scale: 1.1,
                backgroundColor: DARK_TEAL,
                borderColor: DARK_TEAL,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Icon changes color on hover */}
            <ArrowUp
                className="w-7 h-7 transition-colors "
                strokeWidth={2.2}
            />

            {/* Hover state: icon turns white */}

        </motion.button>
    );
}