// app/page.tsx
"use client";

import { useState } from "react";
import Image from 'next/image';

export default function HomePage() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];

    // Create a preview for the before image
    const beforeImageUrl = URL.createObjectURL(file);
    setBeforeImage(beforeImageUrl);

    // Prepare form data for the API request
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAfterImage(data.enhancedImageUrl);
    } catch (error) {
      console.error("Error during enhancement:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: "#F8EFE8" }}>
      <div className="flex flex-col items-center space-y-6 p-4 font-urbanist">
        {/* Branding and Header */}
        <div className="flex items-center space-x-2">
          <Image
            src="/sushi-camera-icon.png"
            alt="Sushi Camera Logo"
            width={24}
            height={24}
          />
          <span className="text-xl font-bold text-black">
            sushi<span className="text-[#ED8A6A]">.camera</span>
          </span>
        </div>

        <h1 className="text-3xl font-bold text-black">
          elevate <span className="text-[#ED8A6A]">quality</span>
        </h1>
        <p className="text-gray-600 text-sm text-center">
          just with a single upload. no complex tools, just stunning results.{" "}
          <span role="img" aria-label="sparkle">
            ✨
          </span>
        </p>

        {/* Image Enhancement Comparison */}
        <div className="flex space-x-4">
          {/* Before Enhancement */}
          <div>
            {beforeImage ? (
              <img
                src={beforeImage}
                alt="Before Enhancement"
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">Before</span>
              </div>
            )}
          </div>
          {/* After Enhancement */}
          <div>
            {loading ? (
              <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">Processing...</span>
              </div>
            ) : afterImage ? (
              <img
                src={afterImage}
                alt="After Enhancement"
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">After</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer">
          <div className="px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
               style={{ backgroundColor: "#ED8A6A" }}>
            {/* Upload Icon (inline SVG) */}
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-4-4l-4-4m0 0l-4 4m4-4v12"
              ></path>
            </svg>
            <span className="text-white font-medium">upload</span>
          </div>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </label>
      </div>
    </div>
  );
}
