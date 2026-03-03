"use client";

import { notFound } from "next/navigation";
import { useState } from "react";

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
  "guidelines-01": {
    title: "Assessment of Mangrove Ecosystem Health Based on Spatial Approach",
    description: "",
    pdfUrl: "/docs/01_Assessment_of_Mangrove_Ecosystem_Health.pdf",
  },
  "guidelines-02": {
    title: "Mangrove Mapping",
    description: "",
    pdfUrl: "/docs/02_Mangrove_Mapping.pdf",
  },
  "guidelines-04": {
    title: "Mangrove Ecosystem Management",
    description: "",
    pdfUrl: "/docs/04_Mangrove_Ecosystem_Management.pdf",
  },
  "guidelines-05": {
    title: "Mangrove Botanical Garden Development",
    description: "",
    pdfUrl: "/docs/05_Mangrove_Botanical_Garden_Development.pdf",
  },
  "guidelines-06": {
    title: "World Mangrove Center",
    description: "",
    pdfUrl: "/docs/06_World_Mangrove_Center.pdf",
  },
  "guidelines-07": {
    title: "Mangrove Non-Timber Products",
    description: "",
    pdfUrl: "/docs/07_Mangrove_Non_Timber_Product.pdf",
  },
  "guidelines-08": {
    title: "Mangrove Economic Valuation",
    description: "",
    pdfUrl: "/docs/08_Mangrove_Economic_Valuation.pdf",
  },
  "guidelines-09": {
    title: "Mediation of Tenurial Conflicts in Mangrove Ecosystems",
    description: "",
    pdfUrl:
      "/docs/09_Mediation_of_Tenurial_Conflicts_in_Mangrove_Ecosystems.pdf",
  },
  "guidelines-10": {
    title: "Establishment of RAMSAR Site in Mangrove Ecosystems",
    description: "",
    pdfUrl: "/docs/10_Establishment_of_RAMSAR_Site_in_Mangrove_Ecosystems.pdf",
  },
  "guidelines-11": {
    title: "Biophysical Characteristics Survey",
    description: "",
    pdfUrl: "/docs/11_Biophysical_Characteristics_Survey.pdf",
  },
  "guidelines-12": {
    title: "Post-Harvest Management of Fishery Products",
    description: "",
    pdfUrl: "/docs/12_Post-Harvest_Management_Of_Fishery_Products.pdf",
  },
  "guidelines-13": {
    title: "Silvofishery Development and Management",
    description: "",
    pdfUrl: "/docs/13_Silvofishery_Development_and_Management.pdf",
  },
  "guidelines-14": {
    title: "Mangrove Ecotourism Development",
    description: "",
    pdfUrl: "/docs/14_Mangrove_Ecotourism_Development.pdf",
  },
  "guidelines-15": {
    title:
      "Mitigation and Adaptation Strategies for Mangrove Ecosystems in Response to Climate Change for Human Sustainability and Development",
    description: "",
    pdfUrl:
      "/docs/15_Mitigation_and_Adaptation_Strategies_for_Mangrove_Ecosystems.pdf",
  },
  "guidelines-16": {
    title:
      "Development of Micro, Small, and Medium Entreprises (MSME) Sustainable Management of Mangrove Forest",
    description: "",
    pdfUrl:
      "/docs/16_Development_of_MSME_Sustainable_Management_of_Mangrove_Forest.pdf",
  },
  "guidelines-17": {
    title: "Development of Mangrove Information and Training Center",
    description: "",
    pdfUrl:
      "/docs/17_Development_of_Mangrove_Information_and_Training_Center.pdf",
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
