import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col justify-center items-center py-16">
      <h1 className="text-4xl font-bold mb-12">About Us</h1>
      <div className="flex w-full gap-8 px-16">
        <Card className="bg-gray-200 flex justify-center items-center p-8 w-1/3">
          <Image
            src={"/logo_amnet.png"}
            alt="logo_amnet"
            width={400}
            height={400}
          />
        </Card>
        <Card className="bg-green-800 p-8 flex justify-center items-center w-2/3">
          <h1 className="text-white">
            AMNET is an innovative digital platform designed to enhance natural
            resource management and environmental sustainability by providing
            accurate and relevant data-driven information. This platform serves
            as a hub for documentation, information sharing, and discussions,
            facilitating collaboration among countries in the Southeast Asia
            region. With its intuitive design, AMNET offers users the
            convenience of accessing information, adding content, and retrieving
            supporting documents relevant to specific issues across various
            areas.
          </h1>
          {/* <h1 className="text-white">
            The ASEAN Mangrove Network (AMNET) is a collaborative initiative
            among ASEAN Member States (AMS) that focuses on enhancing efforts to
            conserve and rehabilitate mangrove ecosystems in the region. The
            project, titled ‘Mangrove Ecosystem Management in ASEAN Region,’
            aims to strengthen networking and communication tools between AMNET
            member countries to promote sustainable mangrove management and
            usage. Through this cooperation, member countries can support one
            another in developing better management strategies, policies, and
            systems, while also empowering stakeholders in sustainable mangrove
            ecosystem management.
          </h1> */}
        </Card>
      </div>
    </div>
  );
}
