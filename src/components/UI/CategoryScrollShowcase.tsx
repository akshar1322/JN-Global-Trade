'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  {
    title: 'Rings',
    image: '/images/products/DSC08994.JPG',
  },
  {
    title: 'Earrings',
    image: '/images/products/DSC08998.JPG',
  },
  {
    title: 'Necklaces',
    image: '/images/products/DSC09000.JPG',
  },
  {
    title: 'Bracelets',
    image: '/images/products/DSC09004.JPG',
  },
];

export default function StackedCategoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = gsap.utils.toArray('.panel');

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => '+=' + (containerRef.current?.offsetWidth ?? 0),
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex"
    >
      {categories.map((cat, index) => (
        <div
          key={cat.title}
          className="panel flex-shrink-0 w-screen h-screen flex items-center"
          style={{ zIndex: index % 2 === 0 ? 1 : 5 }}
        >
          {/* Image Section */}
          <div
            className={`relative w-[60%] h-full ${
              index % 2 !== 0 ? 'order-2' : ''
            }`}
          >
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Text Section */}
          <div
            className={`w-[40%] h-full flex items-center justify-center p-10 bg-white text-black ${
              index % 2 !== 0 ? 'order-1' : ''
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-serif">{cat.title}</h2>
              <p className="mt-4 text-lg">
                Explore our finest collection of {cat.title.toLowerCase()}.
              </p>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
