"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Hero() {
  const PRIMARY_DARK = "#0a3d3a";
  const ACCENT_TEAL = "#37e7a0";

  return (
    <section className="relative bg-[#0a3d3a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        {/* Top Badge */}
        <div className="text-center mb-6">
          <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm font-medium">
            DAILY WORLD — TRENDING
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-center text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-5xl mx-auto leading-tight">
          Discover the Stories Shaping the World
          <br />
          <span className="text-teal-300">Straight From Daily World</span>
        </h1>

        {/* Subheading */}
        <p className="text-center text-gray-300 text-base sm:text-lg mt-4 sm:mt-6 max-w-3xl mx-auto">
          Read breaking news, deep insights, lifestyle articles, technology
          updates, and inspiring stories — all in one place. Updated daily.
        </p>

        {/* Featured Section */}
        <div className="mt-14 sm:mt-20 lg:mt-28">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-left">
              Featured Articles
            </h2>

            {/* Slider Arrows */}
            <div className="flex gap-3 justify-center sm:justify-end">
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition">
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-teal-400 flex items-center justify-center hover:bg-teal-300 transition shadow-lg">
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a3d3a]" />
              </button>
            </div>
          </div>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">

            {/* ===================== CARD 1 ===================== */}
            <div className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-gray-700/50 hover:-translate-y-1">
              {/* Top Section */}
              <div className="relative p-6 sm:p-8 pb-4 h-48 sm:h-56 rounded-t-3xl bg-blue-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
                  World News
                </h2>

                {/* Author */}
                <div className="absolute top-6 sm:top-8 right-4 sm:right-8 p-0 pr-2 rounded-2xl flex items-center space-x-3 sm:space-x-4 bg-purple-100">
                  <div className="relative h-24 w-24 sm:h-40 sm:w-40 rounded overflow-hidden border-white shadow-lg">
                    <Image
                      src="/images/hero/journalist.jpg"
                      alt="Sarah Thompson"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-700 hidden sm:block">
                    <p className="font-bold">Sarah Thompson</p>
                    <p className="text-xs font-normal opacity-80">
                      Senior Journalist
                    </p>
                  </div>
                </div>

                <span
                  className="inline-block px-4 py-1 mt-4 bg-[#37e7a0]/40 text-[#0a3d3a] text-[10px] sm:text-xs font-semibold rounded-full border border-[#37e7a0]"
                >
                  #GlobalEconomy
                </span>
              </div>

              {/* Bottom Section */}
              <div className="p-6 sm:p-8">
                <p className="text-sm text-gray-600 font-medium">📅 Dec 11, 2025</p>

                <h3 className="text-lg sm:text-xl font-bold mt-3 text-[#0a3d3a]">
                  How Markets Are Reacting to Global Changes
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Major countries are reshaping their economic strategies,
                  impacting global trade, tech industries, and future
                  opportunities...
                </p>

                <button className="mt-6 sm:mt-8 w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#0a3d3a] text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg">
                  Read More
                </button>
              </div>
            </div>

            {/* ===================== CARD 2 ===================== */}
            <div className="bg-white text-gray-900 rounded-3xl overflow-hidden shadow-2xl transition duration-300 hover:shadow-gray-700/50 hover:-translate-y-1">
              {/* Top Section */}
              <div className="relative p-6 sm:p-8 pb-4 h-48 sm:h-56 rounded-t-3xl bg-blue-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
                  Technology
                </h2>

                <div className="absolute top-6 sm:top-8 right-4 sm:right-8 p-0 pr-2 rounded-2xl flex items-center space-x-3 sm:space-x-4 bg-purple-100">
                  <div className="relative h-24 w-24 sm:h-40 sm:w-40 rounded overflow-hidden border-white shadow-lg">
                    <Image
                      src="/images/hero/writter.webp"
                      alt="Daniel Rivera"
                      fill
                      className="object-cover object-top"
                    />
                  </div>

                  <div className="text-xs sm:text-sm font-semibold text-gray-700 hidden sm:block">
                    <p className="font-bold">Daniel Rivera</p>
                    <p className="text-xs font-normal opacity-80">
                      Tech Writer
                    </p>
                  </div>
                </div>

                <span
                  className="inline-block px-4 py-1 mt-4 bg-[#37e7a0]/40 text-[#0a3d3a] text-[10px] sm:text-xs font-semibold rounded-full border border-[#37e7a0]"
                >
                  #AI
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <p className="text-sm text-gray-600 font-medium">📅 Dec 11, 2025</p>

                <h3 className="text-lg sm:text-xl font-bold mt-3 text-[#0a3d3a]">
                  AI Tools Transforming Daily Life
                </h3>

                <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                  Artificial intelligence continues to expand across industries,
                  reshaping productivity, creativity, and advanced
                  problem-solving...
                </p>

                <button className="mt-6 sm:mt-8 w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#0a3d3a] text-white font-semibold rounded-xl hover:bg-gray-800 transition shadow-lg">
                  Read More
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
