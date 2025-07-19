import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircleMore, PhoneCall } from 'lucide-react';
import Navbar from '@/components/Elements/Navbar';
import Footer from '@/components/Elements/Footer';
import Accordion from '@/components/share/Accordion';
import { getProduct } from '@/lib/getProduct';

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) return notFound();

  const { name, description, price, currency, images } = product;
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
          <p className="text-xl text-gray-800 mb-4">
            {currency} {price}
          </p>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-gray-600 mb-6">
            For inquiries, you can contact us via WhatsApp or email.
          </p>
          <div className="mt-8 flex items-center space-x-6">
            <Link
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <PhoneCall size={24} />
            </Link>
            <Link href={emailURL} className="text-blue-500 hover:text-blue-600">
              <MessageCircleMore size={24} />
            </Link>
          </div>
          <div className="mt-10 divide-y max-w-xl">
            <Accordion title="Product info" content={description || 'No additional product info available.'} />
            <Accordion title="Return & refund policy" content="Items can be returned within 7 days..." />
            <Accordion title="Shipping info" content="We offer free shipping across India..." />
          </div>
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
          fill
          className="object-contain rounded-md"
          priority
        />
      </div>
    </div>
  );
}
