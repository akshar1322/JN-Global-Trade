'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
}

export default function ProductCard({ id, name, price, currency, image }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  return (
    <Link href={`/shop/${id}`} className="block group">
      <motion.div
        ref={cardRef}
        whileHover={{ scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="overflow-hidden rounded-xl bg-white shadow-lg"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-800 transition-colors group-hover:text-pink-600">
            {name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            {currency} {price.toFixed(2)}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
