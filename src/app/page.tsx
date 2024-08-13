"use client";

import Info from "@/components/Info";
import Snippet from "@/components/Snippet";
import Selector from "@/components/Selector";
import Controls from "@/components/Controls";
import ArrayVisualizer from "@/components/ArrayVisualizer";
import Header from "@/components/Header";

import { SortingProvider } from "@/context/sortingcontext";


export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-slate-300 gap-8">
      <SortingProvider>
        <Header />
        <div className="flex flex-col items-center justify-center w-full p-2">
          <Selector />
          <ArrayVisualizer />
          <Controls />
        </div>
          <Info />
          <Snippet /> 
      </SortingProvider>
    </main>
  );
}
