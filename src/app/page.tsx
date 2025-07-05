"use client";
import HeroSection from "@/components/sections/HeroSection";
import GPage from "@/components/share/page";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GPage />
      <HeroSection/>


    </main>
  );
}
