"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Image {
  _id: string;
  publicId: string;
  url: string;
  createdAt: string;
}

export default function ImageGallery() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/images");
        const data = await response.json();
        console.log("image data", data.data);

        if (data.success) {
          setImages(data.data);
        } else {
          setError(data.message || "Failed to fetch images");
        }
      } catch (err) {
        setError("Error fetching images" + err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <div key={image._id} className="border p-2 shadow-sm rounded">
          <Image
            src={image.url}
            alt={`Image ${image._id}`}
            className="w-full h-auto rounded"
            width={300}
            height={300}
          />
          <p className="text-sm text-gray-500">
            Uploaded: {new Date(image.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
