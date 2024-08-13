"use client";

import React from "react";

import { useSortingContext } from "@/context/sortingcontext";

const Info = ({...props}) => {
    const {
        algoInfo
    } = useSortingContext();

    return (
        <>
            {algoInfo && (
                <div className="w-[90vw] 2xl:w-[35%] bg-white rounded-lg shadow-md p-6 ">
                    <h2 className="text-xl font-semibold mb-2">{algoInfo.title}</h2>
                    <p className="text-gray-600 mb-4">{algoInfo.description}</p>        
                    <div>
                        <p> 
                            <strong>Time Complexity:</strong> {algoInfo.complexity.time}
                        </p>
                        <p>
                            <strong>Space Complexity:</strong> {algoInfo.complexity.space}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Info;
