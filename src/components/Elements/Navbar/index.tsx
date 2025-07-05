'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop', mega: true },
  { name: 'Blog', href: '/blog' },
  { name: 'Contacts', href: '/contacts' },
];

const brands = [
  'Necklaces', 'Bracelets', 'Earrings', 'Necklace Set with earrings', 'Brooches', 'Rings', 'Watches', 'Pendants', 'Chains', 'Anklets', 'Cufflinks', 'Charms', 'Hair Accessories', 'Body Jewelry', 'Jewelry Sets',
];

const featuredProducts = [
  {
    tag: ['NEW'],
    name: 'Fleur De Lis Key Brooch',
    price: '$750',
    image: '/images/logos/JN_global_trade_logo.png',
  },
  {
    tag: ['NEW', 'FEATURED'],
    name: 'Starfish Brooch',
    price: '$850',
    image: '/images/logos/JN_global_trade_logo.png',
  },
  {
    tag: ['NEW'],
    name: 'Layer Cake Necklace Set',
    price: '$1,400',
    image: '/images/logos/JN_global_trade_logo.png',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Disable scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0  text-[#3A3A3A] left-0 w-full z-50 bg-white border-b shadow-sm">
        <div className="max-w-screen-xl mx-auto px-2 md:px-1 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image src="/images/logos/JN_global_trade_logo.png" alt="Logo" width={120} height={30}
            className='p-4' />
          </div>

          {/* Center Nav Links */}
          <ul className="hidden lg:flex space-x-8 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <li
                key={link.name}
                className="relative"
                onMouseEnter={() => link.mega && setActiveMega(link.name)}
                onMouseLeave={() => link.mega && setActiveMega(null)}
              >
                <Link
                  href={link.href}
                  className={`hover:text-black transition ${
                    pathname === link.href ? 'text-black font-semibold' : ''
                  }`}
                >
                  {link.name}
                </Link>

                {/* Mega menu for desktop */}
                {link.mega && activeMega === link.name && (
                      <div
                        className="fixed inset-0 top-16 z-40 bg-white overflow-auto transition-all"
                        onMouseEnter={() => setActiveMega(link.name)}
                        onMouseLeave={() => setActiveMega(null)}
                      >
                        <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-3 gap-10">
                          {/* Brands */}
                          <div>
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Brands</h3>
                            <ul className="space-y-2 text-sm">
                              {brands.map((brand) => (
                                <li key={brand}>
                                  <Link href="/brand" className="hover:text-black">
                                    {brand}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Image Banner */}
                          <div className="relative">
                            <Image
                              src="/images/logos/JN_global_trade_logo.png"
                              alt="Promo"
                              width={400}
                              height={300}
                              className="rounded-lg w-full object-cover"
                            />
                            <div className="absolute bottom-4 left-4 text-[#3A3A3A]">
                              <h3 className="text-xl font-semibold ">Order Today<br />And Get Free Delivery</h3>
                              <button className="mt-2 px-4 py-2 border border-white rounded text-black hover:bg-white hover:text-[#3A3A3A] transition">SHOP NOW</button>
                            </div>
                          </div>

                          {/* Featured Products */}
                          <div className="space-y-4">
                            <h3 className="text-lg font-bold mb-4 text-gray-900">Featured</h3>
                            {featuredProducts.map((product, idx) => (
                              <div key={idx} className="flex gap-4 items-center">
                                <Image src={product.image} alt={product.name} width={60} height={60} className="rounded-md" />
                                <div>
                                  <div className="flex gap-1 text-xs mb-1">
                                    {product.tag.map((t, i) => (
                                      <span key={i} className="bg-black text-white px-2 py-0.5 rounded-sm uppercase">{t}</span>
                                    ))}
                                  </div>
                                  <p className="text-sm font-medium">{product.name}</p>
                                  <p className="text-xs text-gray-500">{product.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

              </li>
            ))}
          </ul>

          {/* Right Side Button */}
          <div className="flex items-center gap-4">
            <button className="hidden sm:block bg-black text-white text-sm px-4 py-1.5 rounded hover:bg-gray-800 transition">
              Login
            </button>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden text-2xl text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <Image src="/images/logos/JN_global_trade_logo.png" alt="Logo" width={120} height={30} />
            <button onClick={() => setMobileMenuOpen(false)} className="text-3xl text-gray-700">
              ✕
            </button>
          </div>

          <ul className="space-y-6 text-lg font-medium text-gray-800">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} onClick={() => setMobileMenuOpen(false)} className="block">
                  {link.name}
                </Link>
                {/* Mobile dropdown content if mega */}
                {link.mega && (
                  <div className="mt-4 space-y-4 text-sm pl-4">
                    <div>
                      <p className="font-semibold text-gray-900">Brands</p>
                      <ul className="grid grid-cols-2 gap-1 mt-1">
                        {brands.slice(0, 8).map((b) => (
                          <li key={b}>
                            <Link href="/brand">{b}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mt-4">Featured</p>
                      {featuredProducts.map((p, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Image src={p.image} alt={p.name} width={40} height={40} />
                          <div>
                            <p className="text-sm">{p.name}</p>
                            <p className="text-xs text-gray-500">{p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <button className="w-full bg-black text-white py-2 rounded text-center text-sm">
              Login
            </button>
          </div>
        </div>
      )}

      {/* Spacer for page content */}
      <div className="pt-16" />
    </>
  );
}
