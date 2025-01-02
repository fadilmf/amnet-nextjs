"use client";

import { notFound } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// Set workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js"
//   //   import.meta.url
// ).toString();

const documents: any = {
  "asean-strategy-mangrove": {
    title: "ASEAN Strategy on Sustainable Mangrove Ecosystem Management",
    description:
      "Discover the comprehensive strategy for sustainable mangrove ecosystem management in the ASEAN region. Explore goals, objectives, and insights to ensure environmental balance and sustainability.",
    pdfUrl: "/docs/mangrove1.pdf",
  },
  "strategy-executive-summary": {
    title:
      "ASEAN Strategy on Sustainable Mangrove Ecosystem Management Executive Summary",
    description: "",
    pdfUrl: "/docs/executive-summary.pdf",
  },
};

export default function DocumentPage({ params }: { params: { name: string } }) {
  const document = documents[params.name];

  if (!document) {
    notFound(); // Redirect to 404 if document not found
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {document.title}
          </h1>
          <p className="text-gray-600 mb-6">{document.description}</p>

          <div className="border rounded-lg shadow-inner p-4 bg-gray-100">
            <iframe
              src={document.pdfUrl}
              width="100%"
              height="1200"
              frameBorder="0"
              title={document.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
