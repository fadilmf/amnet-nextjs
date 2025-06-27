"use client";

import { useEffect, useState } from "react";

export default function FileManagementPage() {
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState([]);

  const handleFileUpload = async () => {
    if (!file) return;

    const response = await fetch("/api/minio/upload", {
      method: "POST",
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("File uploaded successfully!");
      fetchDocuments();
    } else {
      alert("Failed to upload file.");
    }
  };

  const fetchDocuments = async () => {
    const response = await fetch("/api/minio/list");
    const data = await response.json();
    setDocuments(data);
  };

  const deleteDocument = async (fileName: string) => {
    const response = await fetch("/api/minio/delete", {
      method: "DELETE",
      body: JSON.stringify({ fileName }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      alert("File deleted successfully!");
      fetchDocuments();
    } else {
      alert("Failed to delete file.");
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Documents</h1>

      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          accept="application/pdf"
        />
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Uploaded Documents</h2>
        <ul>
          {documents.map((doc: any) => (
            <li key={doc.Key} className="flex justify-between items-center">
              <span>{doc.Key}</span>
              <button
                onClick={() => deleteDocument(doc.Key)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
