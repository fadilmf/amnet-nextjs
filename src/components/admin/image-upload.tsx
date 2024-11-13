import React, { useState } from "react";
import {
  useDropzone,
  DropzoneRootProps,
  DropzoneInputProps,
} from "react-dropzone";
import imageCompression from "browser-image-compression";

function ImageUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const handleDrop = async (acceptedFiles: File[], index: number) => {
    setLoadingIndex(index);

    const compressedImages = await Promise.all(
      acceptedFiles.map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          });
          const reader = new FileReader();
          return new Promise<string>((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
            reader.readAsDataURL(compressedFile);
          });
        } catch (error) {
          console.error("Error compressing image:", error);
          return "";
        }
      })
    );

    setImages((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = compressedImages[0] || "";
      return updatedImages;
    });

    setLoadingIndex(null);
  };

  const addImageSlot = () => {
    setImages([...images, ""]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Menggunakan satu instance `useDropzone`
  const dropzoneProps = useDropzone({
    accept: { "image/*": [] },
    onDrop: (files) => handleDrop(files, images.length - 1),
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {images.map((image, index) => (
        <div key={index} className="mt-4">
          {image ? (
            <div className="relative group">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="max-w-full h-auto rounded shadow-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
          ) : (
            <div
              {...dropzoneProps.getRootProps({
                className:
                  "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-100 transition",
              })}
            >
              <input {...dropzoneProps.getInputProps()} />
              {loadingIndex === index ? (
                <p className="text-blue-500">Uploading...</p>
              ) : (
                <p className="text-gray-500">
                  Drag & drop an image here, or click to select one
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addImageSlot}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Another Image
      </button>
    </div>
  );
}

export default ImageUpload;
