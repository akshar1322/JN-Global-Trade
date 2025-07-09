'use client';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/Elements/ProductCard';
import type { IProduct } from '@/models/Product';
import Navbar from '@/components/Elements/Navbar';
import Footer from '@/components/Elements/Footer';

export default function ShopPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/shop');
        if (!res.ok) throw new Error('Failed to fetch products');

        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <div className="bg-white text-gray-700 px-6 py-10">
          <h1 className="text-2xl font-bold mb-6">All Products</h1>

          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={String(product._id)}
                  id={String(product._id)}
                  name={product.name}
                  price={product.price}
                  currency={product.currency}
                  image={product.images?.[0] || '/placeholder.webp'}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
