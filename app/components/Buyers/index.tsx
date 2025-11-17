"use client";

import { useState } from "react";

export default function Buyers() {
  const [file, setFile] = useState<File | null>(null);
  const [placeholders, setPlaceholders] = useState<{ id: number; url: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // FIXED TYPE
  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    generatePlaceholderImages(selectedFile); // pass file
  };

  // FIXED TYPE
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files?.[0] || null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0] || null);
  };

  const generatePlaceholderImages = (file: File) => {
    setLoading(true);

    const temp = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      url: `https://placehold.co/600x400?text=Generating...+${i + 1}`,
    }));

    setPlaceholders(temp);

    setTimeout(() => {
      const final = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        url: URL.createObjectURL(file), // preview actual uploaded image
      }));

      setPlaceholders(final);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="mx-auto max-w-7xl text-center py-10">
      <label
        htmlFor="file"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer transition border-2 border-dashed py-10 px-4 rounded-lg
          ${
            isDragging
              ? "bg-blue-50 border-blue-500"
              : "bg-gray-50 border-gray-300 hover:bg-gray-100"
          }`}
      >
        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
            className="fill-blue-600 mb-4"
          >
            <path d="M10 1C9.73 1 9.48 1.1 9.29 1.29L3.29 7.29C3.1 7.48 3 7.73 3 8V20C3 21.65 4.34 23 6 23H7C7.55 23 8 22.55 8 22C8 21.45 7.55 21 7 21H6C5.45 21 5 20.55 5 20V9H10C10.55 9 11 8.55 11 8V3H18C18.55 3 19 3.45 19 4V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 2.34 19.66 1 18 1H10Z" />
          </svg>

          <p className="text-lg font-medium">
            {file ? file.name : "Drag & Drop your image here"}
          </p>
          <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        </div>

        <input type="file" id="file" onChange={handleFileChange} hidden />
      </label>

      {placeholders.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholders.map((p) => (
            <div
              key={p.id}
              className="rounded overflow-hidden shadow-md bg-white p-2"
            >
              <img
                src={p.url}
                alt="Generated"
                className={`mx-auto rounded transition ${
                  loading ? "animate-pulse" : ""
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
