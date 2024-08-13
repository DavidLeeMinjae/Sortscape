"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

import { useSortingContext } from "@/context/sortingcontext";

const ArrayVisualizer: FC = () => {
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const { array } = useSortingContext();
  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    handleResize();
    // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);

  }, []);


  return (
    <div className="flex justify-center items-end self-center h-[200px] md:h-[400px]">
      <div className="flex items-end space-x-1 md:space-x-2">
        {array.map((height, idx) => (
          <motion.div
            key={idx}
            className={`bg-blue-500 origin-bottom w-[4px] md:w-[20px]`}
            style={{
              height: isMediumScreen ? `${height * 4}px` : `${height *2}px`,
            }}
            layout
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 80 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArrayVisualizer;
