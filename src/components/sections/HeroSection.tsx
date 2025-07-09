'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const images = [
    '/images/stock/prod_kiSgKXPV.webp',
  ];

  const [jewelryImage, setJewelryImage] = useState(images[0]);

  useEffect(() => {
    setJewelryImage(images[Math.floor(Math.random() * images.length)]);
  }, [images]); // Added images to the dependency array

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getImagePosition = () => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    return {
      x: (mousePos.x - centerX) * 0.2,
      y: (mousePos.y - centerY) * 0.2,
    };
  };

  const imagePosition = getImagePosition();

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-white"
    >
      {/* Heading */}
      <motion.h1
        className="absolute z-10 text-[10vw] font-serif text-gray-900 leading-none"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Fine <span className="relative z-20">Jewelry</span>
      </motion.h1>

      {/* Animated Image */}
      <motion.div
        className="absolute z-0 w-[300px] h-[420px] sm:w-[400px] sm:h-[600px] md:w-[500px] md:h-[700px] rounded-xl overflow-hidden"
        animate={{
          x: imagePosition.x,
          y: imagePosition.y,
          transition: { type: 'spring', damping: 20, stiffness: 100 },
        }}
      >
        <Image
          src={jewelryImage}
          alt="Luxury Jewelry"
          fill
          className="object-cover rounded-xl"
          priority
        />
      </motion.div>

      {/* CTA Button */}
      <Link href="/shop-all" className="absolute bottom-10 right-10 z-20">
        <motion.button
          className="px-6 py-3 border border-black text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-black hover:text-white transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Shop All
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </Link>
    </section>
  );
}
