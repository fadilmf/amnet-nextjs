import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function PDFUpload() {
  const [pdfs, setPdfs] = useState<string[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  // Handle file drop and conversion to base64
  const handleDrop = (acceptedFiles: File[], index: number) => {
    setLoadingIndex(index);

    const newPdfs = acceptedFiles.map((file) => {
      const reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPdfs).then((base64Files) => {
      setPdfs((prev) => {
        const updatedPdfs = [...prev];
        updatedPdfs[index] = base64Files[0] || "";
        return updatedPdfs;
      });
      setLoadingIndex(null);
    });
  };

  // Add a new PDF slot
  const addPdfSlot = () => {
    setPdfs([...pdfs, ""]);
  };

  // Remove a specific PDF
  const removePdf = (index: number) => {
    setPdfs((prev) => prev.filter((_, i) => i !== index));
  };

  // Using the useDropzone hook for file drag & drop
  const dropzoneProps = useDropzone({
    accept: { "application/pdf": [] },
    onDrop: (files) => handleDrop(files, pdfs.length - 1),
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {pdfs.map((pdf, index) => (
        <div key={index} className="mt-4">
          {pdf ? (
            <div className="relative group">
              <div className="border p-4 border-gray-300 rounded shadow-lg">
                <p className="text-gray-800">PDF File {index + 1}</p>
                <embed
                  src={pdf}
                  type="application/pdf"
                  width="200"
                  height="200"
                />
              </div>
              <button
                onClick={() => removePdf(index)}
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
                  Drag & drop a PDF here, or click to select one
                </p>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={addPdfSlot}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add Another PDF
      </button>
    </div>
  );
}

export default PDFUpload;
