// pages/index.js
import { useState } from "react";

export default function Home() {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Set a preview for the "before" image
    const beforeImageURL = URL.createObjectURL(file);
    setBeforeImage(beforeImageURL);

    // Prepare form data
    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);

    // Call the API endpoint to "enhance" the image
    const res = await fetch("/api/enhance", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setAfterImage(data.enhancedImageUrl);
    setLoading(false);
  };

  return (
    <div className="bg-white flex items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-6">
        {/* Branding and Header */}
        <div className="flex items-center space-x-2">
          {/* Replace with your actual sushi-inspired camera icon image */}
          <img
            src="/sushi-camera-icon.png"
            alt="Sushi Camera Logo"
            className="w-6 h-6"
          />
          <span className="font-sans text-black">
            sushi<span className="text-red-500">.camera</span>
          </span>
        </div>
        <h1 className="text-3xl font-bold text-black">
          elevate <span className="text-red-500">quality</span>
        </h1>
        <p className="text-gray-500 text-sm text-center">
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
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">Before</span>
              </div>
            )}
          </div>
          {/* After Enhancement */}
          <div>
            {loading ? (
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">Processing...</span>
              </div>
            ) : afterImage ? (
              <img
                src={afterImage}
                alt="After Enhancement"
                className="w-64 h-64 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="w-64 h-64 bg-gray-100 flex items-center justify-center rounded-lg shadow-md">
                <span className="text-gray-500">After</span>
              </div>
            )}
          </div>
        </div>

        {/* Upload Button */}
        <label className="cursor-pointer">
          <div className="px-6 py-3 border border-black rounded-lg text-black flex items-center space-x-2">
            {/* Upload Icon (inline SVG) */}
            <svg
              className="w-4 h-4"
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
            <span>upload</span>
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
