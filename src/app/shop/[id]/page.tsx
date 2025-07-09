'use client';
import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  MessageCircleMore,
  Minus,
  PhoneCall,
  Plus,
} from 'lucide-react';
import type { IProduct } from '@/models/Product';
import Footer from '@/components/Elements/Footer';
import Navbar from '@/components/Elements/Navbar';


interface PageProps {
  params: { id: string }; // Corrected to be a simple object
  searchParams?: { [key: string]: string | string[] | undefined }; // Kept as is
}

async function getProduct(id: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shop/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.product || null;
  } catch {
    return null;
  }
}

export default function ProductPageWrapper({ params }: PageProps) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(params.id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return <div className="p-10">Loading product...</div>;
  if (!product) return notFound();

  const {
    name,
    description,
    price,
    currency,
    images,
  } = product;

  const whatsappMessage = `Hello, I’m interested in "${name}". Could you please provide more details?`;
  const whatsappURL = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(whatsappMessage)}`;
  const emailURL = `/inquiry?product=${encodeURIComponent(name)}`;

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-white max-w-full mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Images */}
        <ImagesSection images={images} name={name} />

        {/* Right - Details */}
        <div>
          <h1 className="text-3xl text-gray-800 font-semibold mb-2">{name}</h1>
          <p className="text-xl text-gray-800 mb-4">{currency} {price}</p>
          <p className="mb-6 text-gray-700">{description}</p>

          {/* Inquiry Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg text-center flex items-center gap-2"
            >
              <PhoneCall size={18} /> WhatsApp Inquiry
            </a>
            <Link
              href={emailURL}
              target="_blank"
              className="border border-gray-700 hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-lg text-center flex items-center gap-2"
            >
              <MessageCircleMore size={18} /> Email Inquiry
            </Link>
          </div>

          {/* Accordion */}
          <AccordionSection product={product} />

          {/* Social Icons */}
          <div className="flex gap-4 mt-8 text-gray-600">
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
              <PhoneCall />
            </a>
            <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
          </div>
        </div>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

// ===================
// Images Section
// ===================
function ImagesSection({ images = [], name }: { images: string[]; name: string }) {
  const [preview, setPreview] = useState(images?.[0] ?? '/fallback.jpg');

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((img, i) => (
          <Image
            key={i}
            src={img}
            alt={`${name} ${i}`}
            width={80}
            height={80}
            className={`cursor-pointer rounded border ${
              preview === img ? 'ring-2 ring-pink-400' : ''
            }`}
            onMouseEnter={() => setPreview(img)}
          />
        ))}
      </div>

      <div className="flex-1">
        <Image
          src={preview}
          alt={name}
          width={500}
          height={500}
          className="rounded-lg object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}

// ===================
// Accordion Section
// ===================
function AccordionSection({ product }: { product: IProduct }) {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpen((prev) => (prev === key ? null : key));
  };

  return (
    <div className="mt-8 border-t pt-4 space-y-4">
      {[
        {
          title: 'Product Info',
          key: 'info',
          content: (
            <ul className="text-sm text-gray-700 space-y-1">
              {product.specifications &&
                Object.entries(product.specifications).map(([k, v]) => (
                  <li key={k}>
                    <span className="capitalize font-medium">{k}</span>: {v}
                  </li>
                ))}
            </ul>
          ),
        },
        {
          title: 'Return & Refund Policy',
          key: 'returns',
          content: (
            <p className="text-sm text-gray-700">
              Returns are accepted within 7 days of delivery. Product must be unused, with original packaging.
            </p>
          ),
        },
        {
          title: 'Shipping Info',
          key: 'shipping',
          content: (
            <p className="text-sm text-gray-700">
              We ship across India in 3–5 business days. Free shipping on orders over ₹999.
            </p>
          ),
        },
      ].map(({ key, title, content }) => (
        <div key={key}>
          <button
            type="button"
            onClick={() => toggle(key)}
            className="flex items-center justify-between w-full text-left font-semibold cursor-pointer text-gray-800 py-2"
          >
            {title}
            {open === key ? <Minus size={16} /> : <Plus size={16} />}
          </button>
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              open === key ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            {open === key && <div className="pt-2">{content}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
