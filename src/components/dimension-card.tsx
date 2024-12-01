"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface Dimension {
  name: string;
  description: string;
  icon?: string;
  score?: number;
}

interface DimensionCardProps {
  dimension: Dimension;
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}

export function DimensionCard({
  dimension,
  isActive,
  onClick,
  onClose,
}: DimensionCardProps) {
  return (
    <motion.div
      layout
      onClick={onClick}
      className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
        isActive ? "col-span-full" : ""
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-green-800">{dimension.name}</h3>
        {isActive && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {dimension.score && (
        <div className="mb-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-600 rounded-full"
              style={{ width: `${dimension.score}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Score: {dimension.score}%
          </p>
        </div>
      )}

      <motion.p
        initial={false}
        animate={{ height: isActive ? "auto" : "3.6rem" }}
        className={`text-gray-600 ${!isActive && "line-clamp-3"}`}
      >
        {dimension.description}
      </motion.p>
    </motion.div>
  );
}
