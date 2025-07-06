'use client';
import React from 'react';
import Navbar from '../Elements/Navbar';
import HeroSection from '../sections/HeroSection';
import Footer from '../Elements/Footer';
import BestSellersSection from '../sections/BestSellersSection';
import CategoryScrollShowcase from '../UI/CategoryScrollShowcase';
import { InfiniteScrollBanner } from './InfiniteScrollBanner';


import { FiStar, FiGift, FiTrendingUp } from "react-icons/fi";
import { ImageCards } from '../Block/ImageCards';
import { InstagramSlider } from '../Block/InstagramSlider';


function GPage() {
  // Move the hook inside the function component


  return (
    <>
      <main>
        <section className=" bg-white">
          <Navbar />
           <HeroSection />
           <BestSellersSection />
           <CategoryScrollShowcase />
           <div className="bg-black">
            <InfiniteScrollBanner
              text="New Arrivals Every Week"
              speed={20}
              direction="left"
              className="bg-gray-100 py-4 text-2xl font-bold text-center"
            >
              <span className="px-4">Explore our latest collections!</span>
            </InfiniteScrollBanner>
            <ImageCards />
            <InstagramSlider />
           </div>


          <Footer />
        </section>

      </main>
    </>
  );
}

export default GPage;

