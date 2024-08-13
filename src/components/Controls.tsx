"use client";

import React from "react";
// import { Button } from "src/components/ui/button";
import { useSortingContext } from "@/context/sortingcontext";

const Controls: React.FC = () => {
  const {
    isAutoSorting,
    startAutoSorting,
    pauseAutoSorting,
    speed,
    setSpeed,
    step,
    resetArray,
    selectedAlgorithm,
  } = useSortingContext();

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(parseInt(event.target.value, 10));
  };

  return (
    <div className="mt-4 flex flex-col md:flex-row justify-center md:space-x-4 md:gap-0 gap-1">

<button 
        onClick={resetArray}
        className={`px-4 py-2 ${isAutoSorting ? 'bg-gray-500' : "bg-red-500"}  text-white rounded focus:ring-2 focus:ring-violet-500`}
        disabled={isAutoSorting}
      >
        Generate New Array
      </button>
      <button 
        onClick={step}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 focus:ring-2 focus:ring-violet-500"
        disabled={!selectedAlgorithm}
      >
         Step
      </button>


      <button
        onClick={isAutoSorting ? pauseAutoSorting : startAutoSorting }
        className={`${isAutoSorting ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500  hover:bg-green-700'} px-4 py-2 text-white rounded focus:ring-2 focus:ring-violet-500`}
        disabled={!selectedAlgorithm}
      > 
        {isAutoSorting ? 'Pause' : 'Auto Sort'}
      </button> 

      <label htmlFor="speed" className="text-gray-700 self-center my-1">Sorting Speed</label>
      <input
        id="speed"
        type="range"
        min="1"
        max="100"
        value={speed}
        onChange={handleSpeedChange}
        className="w-40"
      />  



    </div>
  );
};

export default Controls;