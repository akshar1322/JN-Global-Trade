// components/InfiniteScrollBanner.tsx
"use client";
import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";

interface InfiniteScrollBannerProps {
  text?: string;       // Text to scroll (default: "New Arrivals Every Week")
  speed?: number;      // Animation duration (default: 20s)
  direction?: "left" | "right"; // Scroll direction (default: left)
  className?: string;  // Additional Tailwind classes
  children?: ReactNode; // Custom content (overrides `text` if provided)
}

export function InfiniteScrollBanner({
  text = "New Arrivals Every Week ",
  speed = 20,
  direction = "left",
  className = "",
  children,
}: InfiniteScrollBannerProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const innerWidth = scroller.scrollWidth / 2;
    const xValue = direction === "left" ? -innerWidth : innerWidth;

    gsap.to(scroller, {
      x: xValue,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, [text, speed, direction]);

  return (
    <div className={`relative text-7xl overflow-hidden py-4 ${className}`}>
      <div
        ref={scrollerRef}
        className="whitespace-nowrap flex items-center"
      >
        {/* Render custom children or duplicate text */}
        {children ? (
          <>
            {children}
            {children} {/* Duplicate for seamless looping */}
          </>
        ) : (
          [...Array(4)].map((_, i) => (
            <span key={i} className="text-7xl font-bold px-4">
              {text}
            </span>
          ))
        )}
      </div>
    </div>
  );
}
