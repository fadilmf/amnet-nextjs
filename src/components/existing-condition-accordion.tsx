"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "./ui/button";
import { ImageIcon } from "lucide-react";

interface Condition {
  title: string;
  description: string;
  images?: string[];
}

interface ExistingConditionAccordionProps {
  conditions: Condition[];
  scrollToGallery: () => void;
}

export function ExistingConditionAccordion({
  conditions,
  scrollToGallery,
}: ExistingConditionAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {conditions?.map((condition, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="bg-white rounded-lg shadow-md border border-gray-200"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-3 text-left">
              <span className="text-lg font-semibold">{condition.title}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-4">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Images Section - Left Side */}
              {condition.images && condition.images.length > 0 && (
                <div className="md:w-1/3 space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {condition.images.slice(0, 4).map((image, imageIndex) => (
                      <div
                        key={imageIndex}
                        className="relative aspect-square cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={scrollToGallery}
                      >
                        <Image
                          src={image.filePath}
                          alt={`${condition.title} image ${imageIndex + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                  {condition.images.length > 0 && (
                    <Button
                      variant="outline"
                      onClick={scrollToGallery}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ImageIcon className="w-4 h-4" />
                      View All Images
                    </Button>
                  )}
                </div>
              )}

              {/* Description - Right Side */}
              <div
                className={`${
                  condition.images && condition.images.length > 0
                    ? "md:w-2/3"
                    : "w-full"
                }`}
              >
                <p className="text-gray-600">{condition.description}</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
