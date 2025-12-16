"use client";

import React, { useState, useEffect, use } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    Calendar,
    User,
    ArrowLeft,
    Share2,
    Clock,
    ChevronLeft,
    BookOpen, // ADDED: For aesthetic loading state
    XCircle, // ADDED: For aesthetic error state
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";

// Vintage Classic Palette
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const VINTAGE_ACCENT = "#996a3f"; // Sepia/Deep Gold
const ACCENT_TEAL = "#119188"; // Classic Teal/Green
const TEXT_MUTED = "#666"; // Muted gray for meta

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

export default function PostPage() {
    const params = useParams();
    const { id } = params;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);
    const [comment, setComment] = useState("");
    const [user, setUser] = useState(null);
    const BASE_URL = "https://blogging-web-production.up.railway.app";


  const userState = useSelector((state) => state.auth.user);
useEffect(() => {
    if (userState) {
        console.log("User state in PostPage:", userState._id);
        setUser(userState); // optional, only if you need separate local state

    }
}, [userState]);

    // NOTE: fetchPost and useEffect logic remains unchanged as requested.
    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            try {
                const res = await fetch(`${BASE_URL}/api/posts/single-post/${id}`);
                if (!res.ok) throw new Error("Post not found");

                const data = await res.json();
                setPost(data.post);
                console.log(data.post);

                
            } catch (err) {
                setError("This article seems to have wandered off...");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Comment submitted:", comment);
        commentSubmitHandler()



    };
  const scrollToId = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" }); // smooth scroll
  }
};


    const commentSubmitHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/posts/${id}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comment, userId: user._id  , username: user.username  }),
            });
            if (!res.ok) throw new Error("Failed to submit comment");

            alert("Comment submitted successfully!");
            setComment("");
        }
        catch (err) {
            console.error(err);
            alert(err.message);
        }
    };


    // Reading progress bar logic remains the same
    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setReadingProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* ================== LOADING STATE (UI Enhanced) ================== */
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: WARM_CREAM }}>
                <motion.div
                    // Subtle up-down breathing animation for the book icon
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <BookOpen className="w-16 h-16" style={{ color: VINTAGE_ACCENT }} strokeWidth={1.5} />
                </motion.div>
                <p className="mt-4 text-lg font-serif" style={{ color: DEEP_CHARCOAL }}>
                    Retrieving the archived manuscript...
                </p>
            </div>
        );
    }

    /* ================== ERROR/NOT FOUND STATE (UI Enhanced) ================== */
    if (error || !post) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: WARM_CREAM }}>
                <div className="text-center max-w-md bg-white p-10 rounded-lg shadow-xl border border-red-100">
                    <XCircle className="w-12 h-12 mx-auto mb-6 text-red-600" />
                    <div className="text-4xl font-serif mb-4" style={{ color: DEEP_CHARCOAL }}>Article Not Found</div>
                    <p className="text-xl font-sans" style={{ color: TEXT_MUTED }}>
                        {error || "The requested article could not be located in the journal's archives."}
                    </p>
                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center gap-2 text-lg font-semibold border-b border-dashed transition hover:opacity-80"
                        style={{ color: ACCENT_TEAL }}
                    >
                        <ArrowLeft size={18} />
                        Back to The Journal
                    </Link>
                </div>
            </div>
        );
    }

    /* ================== MAIN UI ================== */
    return (
        <>
            {/* INJECTED: Global CSS for Prose/Content Styling */}
            <style jsx global>{`
                .prose h2, .prose h3 {
                    color: ${DEEP_CHARCOAL};
                    font-family: 'Georgia', serif;
                    border-bottom: 1px solid ${VINTAGE_ACCENT}30; /* Subtle accent line */
                    padding-bottom: 0.2rem;
                    margin-top: 1.5em !important;
                }
                .prose a {
                    color: ${VINTAGE_ACCENT};
                    border-bottom: 1px dashed ${VINTAGE_ACCENT};
                    text-decoration: none;
                    transition: opacity 0.3s;
                }
                .prose a:hover {
                    opacity: 0.7;
                }
                .prose ol li::marker, .prose ul li::marker {
                    color: ${VINTAGE_ACCENT};
                }
                .prose strong {
                    color: ${DEEP_CHARCOAL};
                }
            `}</style>

            {/* ENHANCED: Sticky Header (Back Button & Progress Bar) */}
            <div
                className="sticky top-0 z-50 shadow-md transition-all duration-300"
                style={{ backgroundColor: WARM_CREAM }}
            >
                {/* Reading Progress Bar (Fixed thickness, Teal color) */}
                <div className="h-1" style={{ backgroundColor: WARM_CREAM }}>
                    <div
                        className="h-1 transition-all duration-300"
                        style={{
                            width: `${readingProgress}%`,
                            backgroundColor: ACCENT_TEAL,
                        }}
                    />
                </div>

                <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-wider font-semibold transition hover:opacity-80"
                        style={{ color: DEEP_CHARCOAL }}
                    >
                        <ArrowLeft size={16} />
                        <span>Journal Index</span>
                    </Link>

                    <span className="text-xs font-sans" style={{ color: TEXT_MUTED }}>
                        Reading: {Math.min(100, Math.round(readingProgress))}%
                    </span>
                </div>
            </div>


            <div className="min-h-screen pb-32" style={{ backgroundColor: WARM_CREAM }}>

                <article className="max-w-5xl mx-auto px-6 md:px-12 pt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Category Tag */}
                        <span
                            className=" bg-[#0a3d3a] text-white/90 inline-block px-4 py-1 text-xs font-semibold tracking-wider uppercase rounded-sm mb-6 shadow-sm"

                        >
                            {post.category || "Reflections"}
                        </span>

                        {/* Title */}
                        <h1
                            className="text-4xl md:text-6xl font-light leading-tight max-w-4xl font-serif"
                            style={{ color: DEEP_CHARCOAL }}
                        >
                            {post.title}
                        </h1>

                        {/* Meta (Enhanced icons/separator) */}
                        <div className="flex flex-wrap items-center gap-6 mt-8 text-sm pb-8 border-b border-gray-300" style={{ color: TEXT_MUTED }}>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} style={{ color: VINTAGE_ACCENT }} />
                                <span>{formatDate(post.createdAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} style={{ color: VINTAGE_ACCENT }} />
                                <span>{post.author || "The Editor"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} style={{ color: VINTAGE_ACCENT }} />
                                <span>{post.readTime || "8 min read"}</span>
                            </div>
                            <div className="flex items-center gap-2" onClick={()=> scrollToId("comments")} >
                                <span>See Comments</span>
                            </div>
                        </div>

                        {/* Featured Image (Enhanced with Framer Motion hover) */}
                        <motion.div
                            className="relative mt-12 mb-16 h-96 md:h-128 rounded-lg overflow-hidden "
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src={
                                    post.imageUrl
                                        ? `${BASE_URL}${post.imageUrl}`
                                        : "/placeholder-classic.jpg"
                                }
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>

                        {/* Intro / Teaser (Elevated blockquote style) */}
                        {post.intro && (
                            <p
                                className="text-xl md:text-2xl font-light leading-relaxed max-w-4xl italic mb-16 p-8 bg-white/60 shadow-inner rounded-lg border-l-4 border-r-4"
                                style={{ borderColor: VINTAGE_ACCENT, color: DEEP_CHARCOAL }}
                            >
                                {post.intro}
                            </p>
                        )}

                        {/* Main Content */}
                        <div
                            className="prose prose-lg max-w-none font-serif leading-loose text-gray-800"
                            style={{ color: DEEP_CHARCOAL }}
                            dangerouslySetInnerHTML={{ __html: post.content || "<p>No content available yet.</p>" }}
                        />

                        {/* Share & Footer (Refined button style) */}
                        <div className="mt-20 pt-16 border-t-2 border-gray-200">
                            <div className="flex items-center justify-between flex-wrap gap-6">
                                <p className="text-sm uppercase tracking-wider font-sans" style={{ color: TEXT_MUTED }}>
                                    Thank you for reading
                                </p>

                                <button
                                    className="flex items-center gap-3 px-6 py-3  border-2 uppercase text-sm font-semibold tracking-wider transition hover:bg-black hover:text-white"
                                    style={{ borderColor: DEEP_CHARCOAL }}
                                    onClick={() => {
                                        navigator.share
                                            ? navigator.share({ title: post.title, url: window.location.href })
                                            : navigator.clipboard.writeText(window.location.href).then(() => alert("Link copied!"));
                                    }}
                                >
                                    <Share2 size={16} />
                                    Share This Article
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </article>

                {/* Assume the following constants are defined:
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const VINTAGE_ACCENT = "#996a3f";
const ACCENT_TEAL = "#119188";
const TEXT_MUTED = "#666";
// Assume post, comment, setComment, and handleSubmit are available in scope.
// You must ensure handleSubmit is defined in the parent component and prevents default.
*/}

                <div className="max-w-5xl mx-auto px-6 md:px-12 mt-20 flex flex-col gap-10">

                    {/* 1. Comment Submission Form (Styled for Vintage Look) */}
                    <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
                        <h2 className="text-3xl font-serif font-bold mb-6" style={{ color: DEEP_CHARCOAL }}>
                            Share Your Reflection
                        </h2>

                        {/* NOTE: You must ensure 'handleSubmit' is defined and calls e.preventDefault() */}
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className={`w-full p-4 border rounded-lg focus:ring-2 focus:ring-offset-2 transition resize-none 
                           text-lg font-serif placeholder:font-sans placeholder:text-gray-400`}
                                rows="4"
                                placeholder="Write your insightful comment here..."
                                style={{
                                    color: DEEP_CHARCOAL,
                                    borderColor: VINTAGE_ACCENT + '60',
                                    outline: 'none',
                                    '--tw-ring-color': ACCENT_TEAL, // Tailwind focus ring color
                                    '--tw-ring-offset-color': WARM_CREAM, // Ring offset color
                                }}
                            />

                            <button
                                type="submit"
                                className={`mt-6 px-8 py-3 uppercase text-sm font-semibold tracking-wider transition duration-300 shadow-md 
                           hover:shadow-lg hover:opacity-90 active:scale-[0.99]`}
                                style={{
                                    backgroundColor: ACCENT_TEAL,
                                    color: WARM_CREAM,
                                    border: `2px solid ${ACCENT_TEAL}`,
                                }}
                            >
                                Submit Reflection
                            </button>
                        </form>
                    </div>


                    {/* 2. All Comments List (Styled as Journal Entries) */}
                    <div className="pt-4" id="comments">
                        {/* Title for the Comment Section */}
                        <div className="flex items-center gap-3 mb-8 border-b pb-4" style={{ borderColor: VINTAGE_ACCENT + '50' }}>
                            {/* Using MessageSquare icon from lucide-react */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={VINTAGE_ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>

                            <span className="text-3xl font-serif font-bold" style={{ color: DEEP_CHARCOAL }}>
                                {post.comments && post.comments.length > 0 ? `${post.comments.length} Reflections` : 'No Reflections Yet'}
                            </span>
                        </div>

                        {/* Conditional Rendering of Comments */}
                        {post.comments && post.comments.length > 0 ? (
                            <div className="flex flex-col-reverse gap-6">
                                {post.comments.map((cmt) => (
                                    <div
                                        key={cmt._id}
                                        className="p-6 bg-white rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md"
                                        style={{ borderLeft: `4px solid ${VINTAGE_ACCENT}80` }}
                                    >
                                        {/* Comment Content */}
                                        <p className="text-gray-800 text-lg font-serif leading-relaxed" style={{ color: DEEP_CHARCOAL }}>
                                            {cmt.comment}
                                        </p>

                                        {/* Comment Metadata */}
                                        <div className="flex flex-wrap items-center gap-4 mt-3 text-sm font-sans border-t pt-3" style={{ borderColor: WARM_CREAM }}>
                                            {/* User/Author Placeholder (Using Feather Icon) */}
                                            <span className="flex items-center gap-1 font-semibold" style={{ color: VINTAGE_ACCENT }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={VINTAGE_ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-feather"><path d="M20.24 12.24l-8.48-8.49L1.97 12.24l8.48 8.49z" /><path d="M12.24 20.24l-8.49-8.48L12.24 1.97l8.49 8.48z" /></svg>
                                                {cmt.username || 'Anonymous'}
                                                {/* {cmt._id || 'Anonymous'} */}

                                                {/* {userState.username || 'Anonymous'} */}
                                            </span>

                                            {/* Timestamp (Using Clock Icon) */}
                                            <span className="flex items-center gap-1 italic" style={{ color: TEXT_MUTED }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT_MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                {cmt.createdAt ? formatDate(cmt.createdAt) : 'Just Now'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Styled Empty State
                            <div className="text-center p-12 rounded-lg border-2 border-dashed border-gray-300" style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={TEXT_MUTED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square mx-auto mb-4">

                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                <p className="text-lg font-sans" style={{ color: TEXT_MUTED }}>
                                    The archive section is empty. Be the first to add your reflection!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {/* Final CTA */}
                <div className="mt-24 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 text-lg font-medium uppercase tracking-wider transition hover:gap-5"
                        style={{ color: ACCENT_TEAL }}
                    >
                        <ChevronLeft size={20} />
                        Return to All Articles
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}