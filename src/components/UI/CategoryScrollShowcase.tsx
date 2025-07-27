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
    image: '/images/products/prod_c87MXymR.webp',
  },
  {
    title: 'Earrings',
    image: '/images/products/prod_kf56arWI.webp',
  },
  {
    title: 'Necklaces',
    image: '/images/products/prod_JiBJm51f.webp',
  },
  {
    title: 'Bracelets',
    image: '/images/products/prod_lqTAAzd_.webp',
  },
];

export default function StackedCategoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth >= 1024) {
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
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-x-hidden lg:flex"
    >
      {categories.map((cat, index) => (
        <div
          key={cat.title}
          className="panel flex-shrink-0 w-full lg:w-screen min-h-screen flex flex-col lg:flex-row items-center"
          style={{ zIndex: index % 2 === 0 ? 1 : 5 }}
        >
          {/* Image Section */}
          <div
            className={`relative w-full lg:w-[60%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-full ${
              index % 2 !== 0 ? 'lg:order-2' : ''
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
            className={`w-full lg:w-[40%] h-auto lg:h-full flex items-center justify-center p-6 sm:p-10 bg-white text-black ${
              index % 2 !== 0 ? 'lg:order-1' : ''
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif">
                {cat.title}
              </h2>
              <p className="mt-4 text-sm sm:text-base md:text-lg">
                Explore our finest collection of {cat.title.toLowerCase()}.
              </p>
            </motion.div>
          </div>
        </div>
      ))}
    </section>
  );
}
