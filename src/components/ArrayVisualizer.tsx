"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

import { useSortingContext } from "@/context/sortingcontext";
import React from "react";

const ArrayVisualizer: FC = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { array, comparisonIndices } = useSortingContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    handleResize();
    // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center items-end self-center h-[200px] md:h-[400px] relative">
      <div className="flex items-end space-x-1 md:space-x-2">
        {array.map((height, idx) => (
          <motion.div key={idx} layoutId={`bar-${idx}`} className="relative">
            {/* Add layoutId */}
            <motion.div
              className={`${
                comparisonIndices.indicies.includes(idx)
                  ? "bg-red-500"
                  : "bg-blue-500"
              } ${
                comparisonIndices.matchIndex === idx && "!bg-green-500"
              } 
              ${
                comparisonIndices.transparentIndex === idx && "bg-transparent"
              }
              ${
                comparisonIndices.iteratorIndex === idx && "bg-yellow-500"
              }
              ${
                comparisonIndices.swapIndices?.includes(idx) && "bg-purple-500"
              } 
              origin-bottom w-[4px] md:w-[20px]`}
              style={{
                height: isMediumScreen ? `${height * 4}px` : `${height * 2}px`,
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 80 }}
            />
            <motion.div
              className="absolute text-xs text-white -top-4 hidden md:block"
              layoutId={`label-${idx}`} // Add layoutId
            >
              {height}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;