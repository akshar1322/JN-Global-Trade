"use client";

import { instagramPosts } from "@/data/instgrampostinfo";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function InstagramSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth * 0.6;
      scrollRef.current.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white py-10 px-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-medium">Follow us on Instagram</h2>
        <p className="text-sm text-gray-400 mt-2">@dennel &nbsp; <span className="text-pink-400">#dennelgold</span></p>
      </div>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto no-scrollbar px-8"
        >
          {instagramPosts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative min-w-[200px] md:min-w-[250px] rounded-lg overflow-hidden group"
            >
              <img
                src={post.image}
                alt={`Instagram post ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm flex-wrap text-white px-2">
                {post.hashtags.map((tag, idx) => (
                  <span key={idx} className="mx-1">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/70 hover:bg-white text-black rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
