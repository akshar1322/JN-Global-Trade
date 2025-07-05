// app/components/FSQ.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { faqData } from '@/data/fsq';
import localFont from 'next/font/local';


//  fonts

const dansregular = localFont({
    src: "../../fonts/DancingScript/DancingScript-Regular.ttf"
   })

const FSQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        }
      );
    }
  }, []);

  return (
    <section className="py-20 px-6 bg-white" id="faq">
      <div className="max-w-4xl mx-auto  text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-12 text-black"
        >
          <span className={`${dansregular.className} text-[#56CBF9] `}>Frequently</span> Asked Questions
        </motion.h2>

        <div ref={containerRef} className="space-y-6 text-left">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-50 rounded-xl shadow-md border border-gray-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {item.question}
                </h3>
                <svg
                  className={`w-6 h-6 transform transition-transform text-lime-900 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-gray-700 text-lg mt-4"
                >
                  {item.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FSQ;
