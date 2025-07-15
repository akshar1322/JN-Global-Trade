'use client';

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircleMore, Minus, PhoneCall, Plus } from 'lucide-react';
import type { IProduct } from '@/models/Product';
import Navbar from '@/components/Elements/Navbar';
import Footer from '@/components/Elements/Footer';

async function getProduct(id: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`/api/shop/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [accordionOpen, setAccordionOpen] = useState<'info' | 'return' | 'shipping' | ''>('info');

  useEffect(() => {
    getProduct(params.id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <div className="p-10 text-center">Loading product...</div>;
  if (!product) return notFound();

  const { name, description, price, currency, images, } = product;
  const whatsappMessage = `Hello, I’m interested in "${name}". Could you please provide more details?`;
  const whatsappURL = `https://wa.me/917359709631?text=${encodeURIComponent(whatsappMessage)}`;
  const emailURL = `/inquiry?product=${encodeURIComponent(name)}`;

  return (
    <>
      <Navbar />

      <main className="bg-white max-w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <ImagesSection images={images} name={name} />

        <div>
          <h1 className="text-3xl text-gray-800 font-semibold mb-2">{name}</h1>
          <p className="text-xl text-gray-800 mb-4">{currency} {price}</p>

          <p className="text-gray-700 mb-4">{description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-lg font-medium">Quantity:</span>
            <div className="flex items-center border rounded-md">
              <button className="p-2"><Minus size={20} /></button>
              <input type="number" min="1" defaultValue="1" className="w-16 text-center border-l border-r py-1 px-2" />
              <button className="p-2"><Plus size={20} /></button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">For inquiries, you can contact us via WhatsApp or email.</p>

          <div className="mt-8 flex items-center space-x-6">
            <Link href={whatsappURL} target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600">
              <PhoneCall size={24} />
            </Link>
            <Link href={emailURL} className="text-blue-500 hover:text-blue-600">
              <MessageCircleMore size={24} />
            </Link>
          </div>

          {/* Accordion Section Starts */}
          <div className="mt-10 divide-y max-w-xl">
            {/* Product Info */}
            <div className="py-4 cursor-pointer" onClick={() => setAccordionOpen(accordionOpen === 'info' ? '' : 'info')}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Product info</h3>
                <span>{accordionOpen === 'info' ? '−' : '+'}</span>
              </div>
              {accordionOpen === 'info' && (
                <p className="mt-2 text-gray-600">
                  { description || "No additional product info available."}
                </p>
              )}
            </div>

            {/* Return & Refund Policy */}
            <div className="py-4 cursor-pointer" onClick={() => setAccordionOpen(accordionOpen === 'return' ? '' : 'return')}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Return & refund policy</h3>
                <span>{accordionOpen === 'return' ? '−' : '+'}</span>
              </div>
              {accordionOpen === 'return' && (
                <p className="mt-2 text-gray-600">
                  Items can be returned within 7 days of delivery. The item must be unused and in original condition. Refunds will be processed within 5–7 business days.
                </p>
              )}
            </div>

            {/* Shipping Info */}
            <div className="py-4 cursor-pointer" onClick={() => setAccordionOpen(accordionOpen === 'shipping' ? '' : 'shipping')}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Shipping info</h3>
                <span>{accordionOpen === 'shipping' ? '−' : '+'}</span>
              </div>
              {accordionOpen === 'shipping' && (
                <p className="mt-2 text-gray-600">
                  We offer free shipping across India. Orders are typically delivered within 5–10 business days. You will receive tracking details once your order is shipped.
                </p>
              )}
            </div>
          </div>
          {/* Accordion Section Ends */}

        </div>
      </main>

      <Footer />
    </>
  );
}

function ImagesSection({ images, name }: { images: string[]; name: string }) {
  const imageUrl = images && images.length > 0 ? images[0] : '/placeholder-image.png';

  return (
    <div className="flex justify-center">
      <div className="relative w-full max-w-md h-96">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="rounded-md"
        />
      </div>
    </div>
  );
}
