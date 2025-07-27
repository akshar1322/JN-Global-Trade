'use client';

import Image from 'next/image';
import { useState } from 'react';
import countries from '@/lib/countries'; // ✅ Importing from your lib
import Navbar from '@/components/Elements/Navbar';
import Footer from '@/components/Elements/Footer';

export default function ContactPage() {
  const [selectedLocation, setSelectedLocation] = useState(0);

  const locations = [
    {
      name: 'Location 1',
      image: '/images/locations/prod_JgdBYOZK.webp',
      city: 'Bhavnagar',
      store: 'JN Global Trade',
      address: 'Nilambag Road NR bahumali bhawan Thenewjahangir vakil millcompound',
      phone: '+91 73597-09631',
      hours: 'Monday to Friday\n10:00am - 8:00pm',
    },
  ];

  return (
    <>
        <main className="">
            <header>
                <Navbar />
            </header>
            <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
               {/* Heading */}
                <div className="text-center grid grid-cols-1 md:grid-cols-2 gap-4">
                    <h2 className="text-4xl font-semibold mb-2 ">Get in Touch</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                    We love our customers. You can reach us at any time.<br />
                    Contact us by email, or call.
                    </p>
                </div>

                    {/* Hero Banner */}
                    <div className="w-full rounded-lg overflow-hidden">
                        <Image src="/images/banners/prod_UjA7UVXz.webp"
                        alt="Hero"
                        width={1200}
                        height={600} className="w-full h-auto object-cover" />
                    </div>

                    {/* Customer Service + Form Grid */}
                    <div className="p-6 bg-gray-100 rounded-xl ">
                        {/* Left: Info */}
                        <div className="space-y-4 text-lg">
                        <h3 className="text-xl font-semibold">Customer Service</h3>
                        <p>Phone: +91 73597-09631</p>
                        <p>Email: jnglobaltrade55@gmail.com</p>
                        <p>Hours: Monday-Friday 9:00am - 7:00pm EST</p>
                        <p>For questions regarding our products and services you can also contact us by filling out the form below.</p>
                        </div>

                        {/* Right: Form Section with Black Background */}
                        <div className="bg-black p-6 mt-6 rounded-xl text-white">
                        <form action="https://api.web3forms.com/submit" method="POST" className="space-y-4">
                            <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_KEY} />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="firstName" required placeholder="First Name" className="bg-white text-black border p-3 rounded-md w-full" />
                            <input name="lastName" required placeholder="Last Name" className="bg-white text-black border p-3 rounded-md w-full" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input name="email" type="email" required placeholder="Email" className="bg-white text-black border p-3 rounded-md w-full" />
                            <div className="flex gap-2">
                                <select name="countryCode" required className="bg-white text-black border p-3 rounded-md w-1/3">
                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                    {country.flag} {country.name} ({country.code})
                                    </option>
                                ))}
                                </select>
                                <input name="phone" required placeholder="Phone Number" className="bg-white text-black border p-3 rounded-md w-2/3" />
                            </div>
                            </div>

                            <textarea name="message" placeholder="Your Message" required className="bg-white text-black border p-3 rounded-md w-full h-32 md:col-span-2" />

                            <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition-all">
                            Submit
                            </button>
                        </form>
                        </div>
                    </div>

                    {/* Come Say Hi Section */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-semibold">Come Say Hi</h2>

                        <div className="flex gap-8 border-b border-gray-300">
                        {locations.map((loc, i) => (
                            <button
                            key={i}
                            className={`pb-2 transition-all duration-300 ${selectedLocation === i ? 'border-b-2 border-black' : 'text-gray-500'}`}
                            onClick={() => setSelectedLocation(i)}
                            >
                            {loc.name}
                            </button>
                        ))}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 pt-6">
                        {/* Left: Image */}
                        <Image src={locations[selectedLocation].image} alt="Store" width={600} height={400} className="rounded-lg shadow-md w-full h-auto object-cover" />

                        {/* Right: Info */}
                        <div className="text-lg leading-7 space-y-2">
                            <p className="text-sm text-gray-500">{locations[selectedLocation].city}</p>
                            <h3 className="text-2xl font-bold">{locations[selectedLocation].store}</h3>
                            <p>{locations[selectedLocation].address}</p>
                            <p>{locations[selectedLocation].phone}</p>
                            <p className="mt-2 whitespace-pre-line">Opening Hours:\n{locations[selectedLocation].hours}</p>
                        </div>
                        </div>
                    </div>
            </div>
            <footer>
                <Footer />
            </footer>
        </main>

    </>
  );
}
