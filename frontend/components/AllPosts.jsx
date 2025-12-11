"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Loading stories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 shadow-lg">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">Warning</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-gray-600">{error}</p>
          </div>
        </div>
      </div>
    );
  
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <div className="bg-gray-100 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No posts yet</h2>
          <p className="text-gray-500">Be the first to publish something amazing!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Header */}
        <header className="relative overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 py-24 md:py-32">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative container mx-auto px-6 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              The Blog
            </h1>
            <p className="mt-4 text-xl md:text-2xl font-light opacity-90">
              Fresh ideas. Bold perspectives. Daily.
            </p>
          </div>
        </header>

        {/* Posts Grid */}
        <section className="container mx-auto px-6 py-16 md:py-20 -mt-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {posts.map((post, index) => (
              <article
                key={post._id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <Image
                    src={
                      post.imageUrl
                        ? `${BASE_URL}${post.imageUrl}`
                        : "/placeholder.jpg"
                    }
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content */}
                <div className="p-7">
                  <time className="text-sm font-medium text-blue-600 uppercase tracking-wider">
                    {formatDate(post.createdAt)}
                  </time>

                  <h2 className="mt-3 text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>

                  <p className="mt-3 text-gray-600 line-clamp-3 text-sm leading-relaxed">
                    {post.intro || "Dive into this story and explore new ideas..."}
                  </p>

                  {/* Read More */}
                  <div className="mt-6 flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700">
                    <span>Read more</span>
                    <svg
                      className="w-5 h-5 ml-2 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Subtle hover border glow */}
                <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-blue-400/30 transition-all duration-500 pointer-events-none" />
              </article>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-12 mt-20">
          <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Your Blog Name. Crafted with
            <span className="text-red-500 mx-1">♥</span>
            and Next.js
          </div>
        </footer>
      </div>
    </>
  );
}