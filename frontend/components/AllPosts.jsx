"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ChevronRight, // Changed from ArrowRight for a classic look
  User,
  BookOpen,
  Tag,
  Loader2, // For a cleaner loading spinner
  XCircle, // For a cleaner error icon
} from "lucide-react";

// The constants are updated to reflect the new "classic" palette
const BASE_URL = "http://localhost:8000";

// --- New Classic Palette ---
// WARM_CREAM for background (Paper/Parchment feel)
const WARM_CREAM = "#fcf9f3";
// DEEP_CHARCOAL for text (Ink feel)
const DEEP_CHARCOAL = "#2d2a2a";
// VINTAGE_ACCENT for subtle links/details (e.g., a deep gold/sepia)
const VINTAGE_ACCENT = "#996a3f";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long", // Long month name for a classic look
    day: "numeric",
    year: "numeric",
  });
};

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Simulating the fetching for the example
        const res = await fetch(`${BASE_URL}/api/posts/all-posts`);

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError("Unable to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  /* ================== LOADING STATE ================== */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-5 bg-white">
        {/* Classic, thin spinner */}
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
        <p className="text-gray-600 text-lg tracking-wider font-serif">
          Consulting the archives...
        </p>
      </div>
    );
  }

  /* ================== ERROR STATE ================== */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white">
        <div className="max-w-xl text-center border-2 border-red-300 p-10 shadow-lg bg-red-50">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className={`text-2xl font-serif font-bold text-red-900`}>
            System Interrupted
          </h3>
          <p className="mt-4 text-gray-700 font-sans">{error}</p>
          <p className="mt-2 text-sm text-red-500">
            Check the connection to $${BASE_URL}$$
          </p>
        </div>
      </div>
    );
  }

  /* ================== EMPTY STATE ================== */
  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-white">
        <div className="text-center p-12 border-2 border-gray-200 rounded-lg">
          <BookOpen
            className="w-16 h-16 text-gray-400 mx-auto mb-6"
            strokeWidth={1.5}
          />
          <h2 className={`text-3xl font-serif font-bold ${DEEP_CHARCOAL}`}>
            The Pages Are Blank
          </h2>
          <p className="text-gray-600 mt-3 font-sans">
            No published articles were found in the repository.
          </p>
        </div>
      </div>
    );
  }

  /* ================== MAIN UI ================== */
  return (
    <div className={`min-h-screen pt-28 pb-20`} style={{ backgroundColor: WARM_CREAM }}>
      {/* Header title */}
      <div className="text-center mb-16 px-6">
        <h1
          className={`text-6xl sm:text-7xl  font-light tracking-tight`}
          style={{ color: DEEP_CHARCOAL }}
        >
          The Journal
        </h1>
        <p
          className="mt-5 text-lg max-w-3xl mx-auto "
          style={{ color: DEEP_CHARCOAL }}
        >
          <BookOpen className="inline-block mr-2 w-5 h-5 align-middle" />
          A collection of latest musings, reports, and insights.
        </p>
        <hr className="mt-8 max-w-lg mx-auto border-t border-gray-300" />
      </div>

      {/* Posts Grid */}
      <section className="container mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {posts.map((post, index) => (
            <article
              key={post._id}
              className={`group bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl border border-gray-200`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* IMAGE */}
              <div className="relative h-56 bg-gray-100 overflow-hidden border-b border-gray-200">
                <Image
                  src={
                    post.imageUrl
                      ? `${BASE_URL}${post.imageUrl}`
                      : "/placeholder-classic.jpg" // Using a classic placeholder
                  }
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />

                {/* Optional floating tag for category, moved to bottom-left */}
                <span
                  className="absolute bottom-3 left-4 px-3 py-1 text-xs tracking-wider font-semibold rounded-sm shadow-md"
                  style={{
                    backgroundColor: VINTAGE_ACCENT,
                    color: WARM_CREAM,
                  }}
                >
                  {post.category || "Reflections"}
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-6">
                {/* META INFO (Author/Date) */}
                <div className="flex items-center justify-between text-xs text-gray-500 font-sans border-b border-gray-100 pb-3 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {formatDate(post.createdAt)}
                  </span>
                  {/* Assuming post.author exists, if not, remove or use a default */}
                  <span className="flex items-center gap-1">
                    <User size={14} className="text-gray-400" />
                    {post.author || "The Editor"}
                  </span>
                </div>

                {/* TITLE */}
                <h2
                  className={`text-2xl font-serif font-bold leading-snug line-clamp-2 transition-colors`}
                  style={{ color: DEEP_CHARCOAL }}
                >
                  {post.title}
                </h2>

                {/* INTRO / DESCRIPTION */}
                <p className="mt-4 text-gray-600 line-clamp-3 text-base leading-relaxed font-serif">
                  {post.intro || "An in-depth report from the archives..."}
                </p>

                {/* READ MORE (Classic button style) */}
                <button
                  className={`mt-6 inline-flex items-center text-sm font-semibold tracking-wider uppercase transition`}
                 
                >
                  <span className="text-[#119188] border-b cursor-pointer border-dashed border-current pb-0.5">
                    Continue Reading
                  </span>
                  <ChevronRight
                    size={16}
                    className="text-[#119188] ml-2 transform group-hover:translate-x-1 transition duration-300"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}