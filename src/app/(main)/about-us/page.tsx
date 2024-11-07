import { Card, CardContent } from "@/components/ui/card";
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet
            mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Hac
            habitasse platea dictumst vestibulum rhoncus est pellentesque.
            Ultrices eros in cursus turpis massa. Eget sit amet tellus cras
            adipiscing enim eu. Aenean sed adipiscing diam donec adipiscing.
            Quam id leo in vitae turpis massa. Massa tincidunt dui ut ornare
            lectus sit amet est placerat. Amet justo donec enim diam vulputate.
            Pretium nibh ipsum consequat nisl vel pretium.
          </h1>
        </Card>
      </div>
    </div>
  );
}
