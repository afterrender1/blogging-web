"use client";

import React, { useState, useEffect } from "react";
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

const BASE_URL = "http://localhost:8000";

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
    const router = useRouter();
    const { id } = params;

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [readingProgress, setReadingProgress] = useState(0);

    // NOTE: fetchPost and useEffect logic remains unchanged as requested.
    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            try {
                const res = await fetch(`${BASE_URL}/api/posts/single-post/${id}`);
                if (!res.ok) throw new Error("Post not found");

                const data = await res.json();
                setPost(data.post);
            } catch (err) {
                setError("This article seems to have wandered off...");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

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
                                    style={{ borderColor: DEEP_CHARCOAL}}
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
            <Footer/>
        </>
    );
}