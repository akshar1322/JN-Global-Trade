'use client';

import Image from 'next/image';
import localFont from 'next/font/local';
//  fonts

const dansregular = localFont({
    src: "../../fonts/DancingScript/DancingScript-Regular.ttf"
   })

//    const SatoshiRegular = localFont({
//     src: '../../fonts/Satoshi/Fonts/Satoshi-Regular.ttf'
//   });

  const SatoshiBold = localFont({
    src: '../../fonts/Satoshi/Fonts/Satoshi-Bold.ttf'
  });


const AboutUs = () => {
  return (
    <section className={`${SatoshiBold.className} relative bg-white py-20 px-6 md:px-20 overflow-hidden`}>
      {/* Heading and description */}
      <div className="text-center mb-16 max-w-4xl mx-auto relative z-[2]">
        <h2 className="text-5xl font-bold text-black mb-4">About <span  className={`${dansregular.className} text-[#6610F2] text-5xl `} >Us</span> North n Loans</h2>
        <p className="text-xl text-gray-600">
          Learn more about our <span className={`${dansregular.className} text-[#6610F2] text-4xl `} > mission, vision, and the values</span> that drive our work every day.
        </p>
      </div>

      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-[2]">
        {/* Left Image */}
        <div className="w-full flex justify-center">
          <Image
            src="/images/stock/Stocking_02.webp" // update with your actual image path
            alt="About Us"
            width={500}
            height={400}
            className="rounded-xl object-cover"
          />
        </div>

        {/* Right Text with ellipse background */}
        <div className="relative z-[2]">
          {/* Blue ellipse behind text */}
          <div className="absolute top-0 right-[-100px] w-[500px] h-[500px] bg-blue-400 rounded-full blur-[180px] z-[1]" />

          <div className="relative z-[2] text-gray-700 text-lg leading-relaxed bg-white/80 p-6 rounded-xl">
          <p className="mb-4">
            <span className={`${dansregular.className} text-[#6610F2] text-2xl font-bold `} >At</span> North n Loans, we are dedicated to providing our customers with the financial solutions they need to achieve their goals. Our mission is to empower individuals and families by offering a range of loan products that are tailored to meet their unique needs.
          </p>
          <p className="mt-4">
            We understand that financial challenges can arise at any time, which is why we are here to make the loan application process as easy and efficient as possible. Our dedicated team of financial experts is available to guide you through every step of the way, ensuring that you have the support and knowledge you need to make informed decisions.
         </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
