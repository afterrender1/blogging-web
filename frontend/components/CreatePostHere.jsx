// CreatePostHere.js
"use client";
import React, { useState } from "react";

const CreatePostHere = () => {
  // State Management for Form Fields
  const [title, setTitle] = useState("");
  const [intro, setIntro] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Submission Handler (for logging data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !intro || !content || !imageFile) {
      alert("All fields are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("intro", intro);
    formData.append("content", content);
    formData.append("image", imageFile); // matches `upload.single("image")`

    try {
      const res = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create post");

      alert("Post created successfully!");
      setTitle("");
      setIntro("");
      setContent("");
      setImageFile(null);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Brightened background, minimal padding on edges
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* White container, NO shadow, minimal rounded edges for cleaner look */}
      <div className="w-full max-w-3xl bg-white rounded-xl p-6 sm:p-10 lg:p-12 border border-gray-200">
        {/* Header (Using Poppins variable for strong hierarchy) */}
        <h1 className="text-3xl sm:text-4xl font-semibold mb-8 text-center text-gray-900 border-b-2 border-gray-200 pb-4 tracking-wide ">
          ✍️ Create "Daily World" Post
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Input Group: Title, Intro */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Post Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-semibold mb-2 text-gray-700 "
              >
                Post Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                // Flat look: thinner border, focus uses a subtle accent color
                className="w-full rounded-lg border-gray-300 border focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 p-3 transition duration-200 bg-white"
                placeholder="A compelling headline..."
                required
              />
            </div>

            {/* 2. Short Introduction/Teaser */}
            <div>
              <label
                htmlFor="intro"
                className="block text-sm font-semibold mb-2 text-gray-700 "
              >
                Short Introduction (Teaser)
              </label>
              <textarea
                id="intro"
                rows="2"
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                // Flat look: thinner border, focus uses a subtle accent color
                className="w-full rounded-lg border-gray-300 border focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 p-3 transition duration-200 resize-none bg-white"
                placeholder="A brief, engaging summary..."
                required
              ></textarea>
            </div>
          </div>

          {/* 3. Full Content */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-semibold mb-2 text-gray-700 "
            >
              Full Blog Content
            </label>
            <textarea
              id="content"
              rows="12"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              // Flat look: thinner border, focus uses a subtle accent color
              className="w-full rounded-lg border-gray-300 border focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 p-4 transition duration-200 bg-white"
              placeholder="Write the full body of your article here..."
              required
            ></textarea>
          </div>

          {/* 4. Featured Image Upload */}
          <div>
            <label
              htmlFor="image-upload"
              className="block text-sm font-semibold mb-2 text-gray-700 "
            >
              Featured Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className={`cursor-pointer flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg transition p-4
                                            ${imageFile
                    ? "border-green-500 bg-green-50"
                    : "border-gray-400 hover:bg-gray-50"
                  }`} // Subtle hover on flat design
              >
                <svg
                  className="w-9 h-9 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p
                  className={`mt-2 text-sm font-medium ${imageFile ? "text-green-700" : "text-gray-600"
                    }`}
                >
                  {imageFile
                    ? `File Selected: ${imageFile.name}`
                    : "Drag & Drop or Click to upload JPG/PNG"}
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required
                />
              </label>
            </div>
          </div>

          {/* 5. Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-xl font-bold text-white transition duration-300 
                                    ${loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800"
              }`}
          >
            {loading ? "Processing Data..." : "Publish & Log Data"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePostHere;
