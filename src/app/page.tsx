"use client";

import React, { useState } from "react";
import Image from "next/image";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const base64Image = await convertToBase64(image);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const data = await response.json();
    console.log("data get in server (image): ", data);

    if (data.success) {
      alert(`Image uploaded: ${data.imageUrl}`);
    } else {
      alert(`Upload failed: ${data.message}`);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Upload Your Image
      </h2>
      <div className="mb-4">
        <label
          htmlFor="imageUpload"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select an image to upload
        </label>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
        />
      </div>
      {preview && (
        <div className="mb-4">
          <Image
            src={preview}
            alt="Preview"
            width={300}
            height={300}
            className="rounded shadow-md"
          />
        </div>
      )}
      <button
        onClick={handleUpload}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
      >
        Upload Image
      </button>
    </div>
  );
};

export default ImageUploader;
