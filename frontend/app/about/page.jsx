"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Coffee, PenTool, Heart, Mail, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// EXACT SAME PALETTE AS YOUR AllPosts PAGE
const WARM_CREAM = "#fcf9f3";
const DEEP_CHARCOAL = "#2d2a2a";
const VINTAGE_ACCENT = "#996a3f";
const ACCENT_TEAL = "#119188";
const DARK_TEAL = "#0a3d3a"; // Used in post cards for category tag

export default function AboutPage() {
    return (
        <>
            <Navbar />

            <div className="min-h-screen pt-28 pb-20" style={{ backgroundColor: WARM_CREAM }}>

                {/* Hero */}
                <section className="text-center mb-20 px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-6xl sm:text-7xl font-light tracking-tight"
                        style={{ color: DEEP_CHARCOAL }}
                    >
                        About The Journal
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mt-6 text-lg max-w-3xl mx-auto font-serif leading-relaxed"
                        style={{ color: DEEP_CHARCOAL }}
                    >
                        <BookOpen className="inline-block mr-2 w-5 h-5 align-middle" style={{ color: VINTAGE_ACCENT }} />
                        A personal archive of slow thoughts, honest experiments, and quiet discoveries.
                    </motion.p>

                    <hr className="mt-10 max-w-md mx-auto border-t border-gray-300" />
                </section>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="max-w-6xl mx-auto px-6 mb-20"
                >
                    <div className="relative h-80 md:h-144 rounded-lg overflow-hidden shadow-2xl border border-gray-200">
                        <Image
                            src="/images/about/books.png"
                            alt="The Journal workspace"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
                    </div>
                </motion.div>

                {/* Philosophy Cards — Same style as post cards */}
                <section className="container mx-auto px-6 md:px-12 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        {[
                            {
                                icon: <PenTool size={26} />,
                                title: "Slow Writing",
                                desc: "Every piece is written, rewritten, and rested — never rushed for an algorithm.",
                            },
                            {
                                icon: <Heart size={26} />,
                                title: "No Noise",
                                desc: "No clickbait. No trends. No sponsored nonsense. Just ideas that stand the test of time.",
                            },
                            {
                                icon: <Coffee size={26} />,
                                title: "Independently Brewed",
                                desc: "One person, one voice, zero corporate agenda. Made with care, not capital.",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-5 inline-block p-4 rounded-full bg-[#f0ebe3]">
                                    <div style={{ color: VINTAGE_ACCENT }}>{item.icon}</div>
                                </div>
                                <h3 className="text-2xl font-serif font-semibold mb-3" style={{ color: DEEP_CHARCOAL }}>
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed font-serif">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Author Card — Matches post card style exactly */}
                <section className="container mx-auto px-6 md:px-12 max-w-5xl">
                    <motion.article
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl border border-gray-200 transition-all duration-300"
                    >
                        <div className="md:flex">
                            <div className="md:w-5/12 relative h-80 md:h-auto">
                                <Image
                                    src="/images/about/alex.jpg"
                                    alt="Alex — The writer"
                                    fill
                                    className="object-cover   transition-all duration-700"
                                />
                                <span className="absolute bottom-4 left-4 px-3 py-1 text-xs tracking-wider font-semibold rounded-sm shadow-md bg-[#0a3d3a] text-white">
                                    The Editor
                                </span>
                            </div>

                            <div className="md:w-7/12 p-8 md:p-12">
                                <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100 pb-4 mb-6">
                                    <Calendar size={14} />
                                    <span>Writing since 2024</span>
                                </div>

                                <h2 className="text-3xl md:text-4xl font-serif font-light leading-tight" style={{ color: DEEP_CHARCOAL }}>
                                    Just one person with too many notebooks and not enough coffee.
                                </h2>

                                <p className="mt-6 text-lg text-gray-700 leading-relaxed font-serif">
                                    Hi, I’m <span className="font-medium" style={{ color: VINTAGE_ACCENT }}>Alex</span>. By day I build software. By night (and 5 a.m.) I write about money, habits, design, and the small things that quietly change everything.
                                </p>

                                <p className="mt-5 text-lg text-gray-700 leading-relaxed font-serif">
                                    This journal is my public notebook — a place for thoughts too long for social media and too short for a book. No sponsors. No schedule. No pressure. Just honest writing, when it’s ready.
                                </p>

                                <a
                                    href="mailto:hello@yourdomain.com"
                                    className="mt-8 inline-flex items-center text-sm font-semibold tracking-wider uppercase "
                                >
                                    <span className="text-[#119188] border-b border-dashed border-current pb-0.5">
                                        Get in touch
                                    </span>
                                    <ArrowRight size={16} className="ml-2 text-[#119188] group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </motion.article>
                </section>

                {/* Final CTA — Identical to homepage button */}
                <section className="text-center mt-20">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#2d2a2a] uppercase text-sm font-semibold tracking-wider transition-all hover:bg-[#0a3d3a] hover:text-white hover:border-[#0a3d3a]"
                        style={{ color: DEEP_CHARCOAL }}
                    >
                        <BookOpen size={18} className="mr-3" />
                        Return to All Articles
                    </Link>
                </section>

            </div>
            <Footer />
        </>
    );
}