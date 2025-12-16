"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronRight,
  User,
  BookOpen,
  Loader2,
  XCircle,
  CheckCircle,
  MessageSquareText,
  Heart
} from "lucide-react";
import { useRouter } from "next/navigation";

// --- New Classic Palette ---
const BASE_URL = "https://blogging-web-production.up.railway.app";
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const VINTAGE_ACCENT = "#996a3f";
const ACCENT_TEAL = "#119188"; // Reusing ACCENT_TEAL for consistency

// Helper function for date formatting
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

/* ================== SHARED LOADER (Framer Motion Spinner) ================== */
const Spinner = ({ size, color }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <Loader2
      className={`w-${size} h-${size} text-${color}`}
      strokeWidth={2.5}
    />
  </motion.div>
);

/* ================== POST CARD SKELETON COMPONENT ================== */
const PostCardSkeleton = () => (
  <div
    className={`group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 animate-pulse`}
  >
    {/* IMAGE AREA SKELETON */}
    <div className="relative h-56 bg-gray-200 border-b border-gray-200">
      <div className=" bg-gray-300 absolute bottom-3 left-4 px-3 py-1 text-xs tracking-wider font-semibold rounded-sm w-1/4 h-5"></div>
    </div>
    {/* CONTENT SKELETON */}
    <div className="p-6">
      <div className="flex items-center justify-between text-xs text-gray-500 font-sans border-b border-gray-100 pb-3 mb-4">
        <div className="w-1/3 h-3 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-3 bg-gray-200 rounded"></div>
      </div>
      <div className={`h-6 bg-gray-300 rounded w-full mb-3`}></div>
      <div className={`h-6 bg-gray-300 rounded w-5/6`}></div>
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className={`mt-6 inline-block h-4 bg-gray-200 rounded w-1/3`}></div>
    </div>
  </div>
);

/* ================== MAIN COMPONENT ================== */
export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [navigatingToLatest, setNavigatingToLatest] = useState(false);
  const [latestPostSuccess, setLatestPostSuccess] = useState(false);
  const router = useRouter();

  // NEW STATES for User Authentication
  const [user, setUser] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // --- User Fetching Logic (Copied from Navbar/Profile) ---
  const getUser = async () => {
    setIsCheckingSession(true);
    try {
      const res = await fetch(`${BASE_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        }
      }
    } catch (error) {
      console.error("User fetch error:", error);
    } finally {
      setIsCheckingSession(false);
    }
  };

  // --- Posts Fetching Logic ---
  useEffect(() => {
    getUser(); // Fetch user session on component mount

    const fetchPosts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/posts/all-posts`);

        // Mock data for demonstration purposes
        const mockPosts = [
          {
            _id: "1",
            title: "The Subtle Art of Tracking Every Cent",
            intro: "A 90-day experiment in radical financial honesty that led to an unexpected trip to Tokyo. The blind spot is the most expensive one.",
            category: "Finance",
            author: "Cam",
            createdAt: "2025-11-20T10:00:00Z",
            imageUrl: "/placeholder-money.jpg",
            slug: "subtle-art-tracking-cent",
            likedBy: ["user1", "user2"], // Mocked array of user IDs who liked the post
          },
          {
            _id: "2",
            title: "Designing for the Vintage Web: A New Aesthetic",
            intro: "Exploring the 'classic' palette—warm cream, deep charcoal, and sepia tones—to create a timeless, comforting user experience.",
            category: "Design",
            author: "The Editor",
            createdAt: "2025-11-15T12:00:00Z",
            imageUrl: "/placeholder-design.jpg",
            slug: "vintage-web-aesthetic",
            likedBy: [],
          },
          {
            _id: "3",
            title: "Next.js Best Practices: State Management and Data Fetching",
            intro: "A deep dive into server components, client components, and maximizing performance in modern Next.js applications.",
            category: "Tech",
            author: "The Coder",
            createdAt: "2025-11-01T09:00:00Z",
            imageUrl: "/placeholder-tech.jpg",
            slug: "nextjs-best-practices",
            likedBy: ["user1", "user2", "user3", "user4"],
          },
          {
            _id: "4",
            title: "The 5 Rules of Radical Honesty",
            intro: "Why tracking your money for 90 days is the ultimate finance book you never read.",
            category: "Finance",
            author: "Cam",
            createdAt: "2025-11-25T15:30:00Z",
            imageUrl: "/placeholder-honesty.jpg",
            slug: "5-rules-radical-honesty",
            likedBy: ["user1"],
          },
        ];

        // If API succeeds, use real data. Otherwise, use mock data.
        const data = res.ok ? await res.json() : { posts: mockPosts };
        setPosts(data.posts || mockPosts);

      } catch (err) {
        setError("Unable to load posts from server. Showing local archive.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000); // 1-second delay for skeleton visibility

    return () => clearTimeout(timer);
  }, []);

  // --- Handlers ---

  const handlePostClick = (id) => {
    router.push(`/post/${id}`);
  }

  const handleLatestPostClick = () => {
    if (posts.length > 0) {
      setLatestPostSuccess(false);
      setNavigatingToLatest(true);

      const latestPost = posts.reduce((latest, current) => {
        return new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest;
      }, posts[0]);

      setTimeout(() => {
        setNavigatingToLatest(false);
        setLatestPostSuccess(true);
        router.push(`/post/${latestPost._id}`);
      }, 1500);
    }
  };

  // FIXED: Like post function now sends userId from state
  const likePost = async (postId) => {
    if (isCheckingSession || !user) {
      alert("Please sign in to like a post.");
      router.push('/signin');
      return;
    }

    try {
      const likeApi = await fetch(`${BASE_URL}/api/posts/${postId}/like-post`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // SENDING userId from the state (user._id)
        body: JSON.stringify({ userId: user._id }),
      });

      if (!likeApi.ok) {
        const errorData = await likeApi.json();
        throw new Error(errorData.message || "Failed to toggle like status.");
      }

      const data = await likeApi.json();

      // OPTIONAL: Update the local posts state to reflect the new like count immediately
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post._id !== postId) return post;

          const alreadyLiked = post.likedBy.includes(user._id);

          return {
            ...post,
            likedBy: alreadyLiked
              ? post.likedBy.filter(id => id !== user._id) // DISLIKE
              : [...post.likedBy, user._id],               // LIKE
          };
        })
      );


    } catch (error) {
      console.error("Like Post Error:", error);
      alert(`Error: ${error.message}`);
    }
  }

  /* ================== ERROR/EMPTY STATES ================== */
  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: WARM_CREAM }}>
        <div className="max-w-xl text-center border-2 border-red-300 p-10 shadow-lg bg-red-50">
          <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className={`text-2xl font-serif font-bold text-red-900`}>
            System Interrupted
          </h3>
          <p className="mt-4 text-gray-700 font-sans">{error}</p>
          <p className="mt-2 text-sm text-red-500">
            Check the connection to {BASE_URL}
          </p>
        </div>
      </div>
    );
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ backgroundColor: WARM_CREAM }}>
        <div className="text-center p-12 border-2 border-gray-200 rounded-lg bg-white shadow-md">
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


  /* ================== MAIN UI (Handles Skeleton and Data Display) ================== */
  return (
    <div
      className={`min-h-screen pt-28 pb-20`}
      style={{ backgroundColor: WARM_CREAM }}
    >
      {/* Header title */}
      <div className="text-center mb-16 px-6">
        <h1
          className={`text-6xl sm:text-7xl font-light tracking-tight`}
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

        {/* UPDATED BUTTON: See Latest Post with 3 States */}
        <motion.button
          onClick={handleLatestPostClick}
          disabled={navigatingToLatest || latestPostSuccess}
          className={`cursor-pointer mt-6 inline-flex items-center justify-center px-6 py-2 border-2 text-sm font-semibold tracking-wider uppercase transition duration-300 ${latestPostSuccess
            ? "bg-[#119188] border-[#119188] text-white cursor-default"
            : navigatingToLatest
              ? "bg-[#119188]/50 border-[#119188] text-white/80 cursor-not-allowed"
              : "bg-[#119188] border-[#119188] text-white hover:bg-[#0f7a73]"
            }`}
          whileTap={{ scale: 0.98 }}
        >
          {latestPostSuccess ? (
            <>
              <CheckCircle size={16} className="mr-2" />
              <span className="ml-0">Post Found!</span>
            </>
          ) : navigatingToLatest ? (
            <>
              <Spinner size={5} color="white" />
              <span className="ml-2">Seeking Latest...</span>
            </>
          ) : (
            <>
              <Calendar size={16} className="mr-2" />
              See The Latest Post
            </>
          )}
        </motion.button>
      </div>

      {/* Posts Grid - Displays Skeletons while loading, or data when complete */}
      <section className="container mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {loading
            ? // Show 8 skeletons while loading
            Array.from({ length: 8 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))
            : // Show actual posts
            posts.map((post, index) => {
              // Check if the current user has liked this post (for visual feedback)
              const isLiked = user && post.likedBy?.includes(user._id);

              return (
                <motion.article
                  key={post._id}
                  className={`group bg-white rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-xl border border-gray-200`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  {/* IMAGE */}
                  <div className="relative h-56 bg-gray-100 overflow-hidden border-b border-gray-200">
                    <Image
                      src={
                        post.imageUrl
                          ? `${BASE_URL}${post.imageUrl}`
                          : "/placeholder-classic.jpg"
                      }
                      alt={post.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    />

                    {/* Optional floating tag for category, moved to bottom-left */}
                    <span className=" bg-[#0a3d3a] text-white/90 absolute bottom-3 left-4 px-3 py-1 text-xs tracking-wider font-semibold rounded-sm shadow-md">
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

                    {/* READ MORE & LIKE BUTTONS (Aligned on same line) */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                      {/* READ MORE */}
                      <div>
                        <button
                          onClick={() => handlePostClick(post._id)}
                          className={`inline-flex items-center text-sm font-semibold tracking-wider uppercase transition group`}
                        >
                          <span className={`text-[${ACCENT_TEAL}] border-b cursor-pointer border-dashed border-current pb-0.5`}>
                            Continue Reading
                          </span>
                          <ChevronRight
                            size={16}
                            className={`text-[${ACCENT_TEAL}] ml-2 transform group-hover:translate-x-1 transition duration-300`}
                          />
                        </button>
                      </div>
                      <div className="flex justify-center items-center gap-1 text-gray-500">
                        <MessageSquareText size={18} />
                        <span>
                          {post.comments.length || 0}
                       
                        </span>
                      </div>

                      {/* LIKE COUNT/BUTTON */}
                      <div
                        className={`cursor-pointer flex items-center gap-1 transition ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={() => likePost(post._id)}
                        title={user ? "Toggle like" : "Sign in to like"}
                      >
                        <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} strokeWidth={1.5} />
                        <span className="text-sm font-medium">
                          {post.likedBy?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
        </div>
      </section>
    </div>
  );
}