"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

// Vintage Classic Palette (Use the colors defined in your existing components)
const ACCENT_TEAL = "#119188"; // Classic Teal/Green
const DEEP_CHARCOAL = "#2d2a2a";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Function to scroll the document to the top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to handle scroll visibility
  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if page scrolled down more than 300px (standard threshold)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Framer Motion variants for smooth mount/unmount animation
  const buttonVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.8 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  if (!isVisible) return null;

  return (
    <motion.button
      onClick={scrollToTop}
      // Fixed position at the bottom right corner (responsive padding)
      className={`fixed right-4 bottom-4 md:right-8 md:bottom-8 
                  z-50 p-3 md:p-4 rounded-full shadow-lg 
                  transition-colors duration-300 focus:outline-none focus:ring-4`}
      style={{ 
          backgroundColor: ACCENT_TEAL, 
          color: 'white', 
          borderColor: ACCENT_TEAL, 
          // Adjust focus ring to match theme
          boxShadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)` 
      }}
      // Framer Motion properties
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={buttonVariants}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronUp className="w-6 h-6 md:w-7 md:h-7" />
    </motion.button>
  );
}