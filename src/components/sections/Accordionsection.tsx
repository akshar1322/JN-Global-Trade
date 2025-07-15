'use client';
import { useState } from 'react';

function Accordion({ productInfo }: { productInfo: string }) {
  const [open, setOpen] = useState('info');

  const toggle = (key: string) => {
    setOpen(open === key ? '' : key);
  };

  return (
    <div className="divide-y">
      <div className="py-4 cursor-pointer" onClick={() => toggle('info')}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Product info</h3>
          <span>{open === 'info' ? '−' : '+'}</span>
        </div>
        {open === 'info' && (
          <p className="mt-2 text-gray-600">
            {productInfo || "No additional product info available."}
          </p>
        )}
      </div>

      <div className="py-4 cursor-pointer" onClick={() => toggle('return')}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Return & refund policy</h3>
          <span>{open === 'return' ? '−' : '+'}</span>
        </div>
        {open === 'return' && (
          <p className="mt-2 text-gray-600">
            Items can be returned within 7 days of delivery. The item must be unused and in original condition. Refunds will be processed within 5–7 business days.
          </p>
        )}
      </div>

      <div className="py-4 cursor-pointer" onClick={() => toggle('shipping')}>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Shipping info</h3>
          <span>{open === 'shipping' ? '−' : '+'}</span>
        </div>
        {open === 'shipping' && (
          <p className="mt-2 text-gray-600">
            We offer free shipping across India. Orders are typically delivered within 5–10 business days. You will receive tracking details once your order is shipped.
          </p>
        )}
      </div>
    </div>
  );
}
