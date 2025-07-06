'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

export default function BestSellersSection() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/shop/best-sellers');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-10 px-4 sm:px-8 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Best Selling Products</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/shop/${product._id}`}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white overflow-hidden transition"
            >
              <div className="relative w-full h-56">
                <Image
                  src={product.images[0] || '/placeholder.jpg'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">₹{product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
