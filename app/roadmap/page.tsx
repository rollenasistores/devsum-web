"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-effects";
import { Roadmap } from "@/components/roadmap";
import { Loading } from "@/components/loading";
import { useState } from "react";

export default function RoadmapPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}
      <main
        className={`min-h-screen transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        <ScrollProgress />
        <Header />
        <Roadmap />
        <Footer />
      </main>
    </>
  );
}
