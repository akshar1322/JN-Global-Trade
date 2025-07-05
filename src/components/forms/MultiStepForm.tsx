/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { HiArrowNarrowRight, HiArrowSmLeft } from 'react-icons/hi';
import { FaChevronDown } from 'react-icons/fa';
import localFont from 'next/font/local';

const dansregular = localFont({
  src: "../../fonts/DancingScript/DancingScript-Regular.ttf"
});

const SatoshiRegular = localFont({
  src: '../../fonts/Satoshi/Fonts/Satoshi-Regular.ttf'
});
const SatoshiBold = localFont({
  src: '../../fonts/Satoshi/Fonts/Satoshi-Bold.ttf'
});

const steps = [10, 25, 50, 75, 99];

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    loanamount: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    bank: ''
  });
  const [rotateChevron, setRotateChevron] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/submit', formData);
      if (response.status === 200) {
        setSubmitted(true);
      }
    } catch (error) {
      alert('Submission failed. Try again.');
    }
  };

  if (submitted) {
    return (
      <div className={`${SatoshiRegular.className} min-h-screen flex items-center justify-center bg-[url('/images/bg/brooke-cagle-cb4Dv50LN1Y-unsplash.jpg')] bg-cover bg-center px-4 md:px-10 py-10`}>
        <div className="bg-white/30 backdrop-blur-xl p-6 sm:p-10 md:p-16 rounded-3xl shadow-2xl border border-white/40 text-center w-full max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">🎉 Thank You!</h1>
          <p className="text-lg md:text-2xl text-[#333]">Your application has been received. We&apos;ll be in touch very soon!</p>
          <p className="text-3xl md:text-4xl mt-6">💼📬✅</p>
        </div>
      </div>
    );
  }

  const slideVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-cover bg-center px-4 sm:px-6 lg:px-12 py-10`} style={{ backgroundImage: `url('/images/bg/Stock_07.jpg')` }}>
      <div className="relative w-full max-w-4xl sm:max-w-5xl bg-white/20 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 md:p-20 shadow-2xl border border-white/40 text-[#333333]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step1"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideVariants}
              className="space-y-6 sm:space-y-8"
            >
              <h2 className={`${SatoshiBold.className} text-3xl sm:text-4xl md:text-5xl font-bold text-center`}>
                <span className={`${dansregular.className} text-[#6610F2] `}> Quick</span> Apply For Loan
              </h2>
              <div className="space-y-4 relative">
                <label className="block text-lg">Amount Requested</label>
                <div className="relative">
                  <select
                    name="loanamount"
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-3 text-lg sm:text-mg bg-white/70 border border-white/40 appearance-none cursor-pointer "
                    onClick={() => setRotateChevron(!rotateChevron)}
                  >
                    <option  value="">Select amount</option>
                    <option value="1000-2500">$1000 to $2500</option>
                    <option value="2500-5000">$2500 to $5000</option>
                    <option value="5000-15000">$5000 to $15000</option>
                  </select>
                  <motion.div
                    animate={{ rotate: rotateChevron ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                  >
                    <FaChevronDown />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step2" initial="hidden" animate="visible" exit="exit" variants={slideVariants} className="space-y-6">
              <h2 className={`${SatoshiBold.className} text-3xl sm:text-4xl md:text-5xl font-bold text-center`}>
                <span className={`${dansregular.className} text-[#56CBF9] `}> Basic</span> Information
              </h2>
              {['firstName', 'lastName', 'email'].map((field, i) => (
                <div key={i} className="relative">
                  <label className="text-md capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    name={field}
                    placeholder={`e.g. ${field === 'email' ? 'hello@mail.com' : 'John'}`}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-lg sm:text-xl border border-white/40 bg-white/60"
                  />
                </div>
              ))}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step3" initial="hidden" animate="visible" exit="exit" variants={slideVariants} className="space-y-6">
              <h2 className={`${SatoshiBold.className} text-3xl sm:text-4xl md:text-5xl font-bold text-center`}><span className={`${dansregular.className} text-[#56CBF9]`}> Personal</span> Information</h2>
              {['phone', 'city', 'state'].map((field, i) => (
                <div key={i} className="relative">
                  <label className="text-md capitalize">{field}</label>
                  <input
                    type="text"
                    name={field}
                    placeholder={`e.g. ${field}`}
                    onChange={handleChange}
                    className="w-full rounded-xl px-4 py-3 text-lg sm:text-xl border border-white/40 bg-white/60"
                  />
                </div>
              ))}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step4" initial="hidden" animate="visible" exit="exit" variants={slideVariants} className="space-y-6">
              <h2 className={`${SatoshiBold.className} text-3xl sm:text-4xl md:text-5xl font-bold text-center`}>
                <span className={`${dansregular.className} text-[#56CBF9]`}> Bank</span> Information
              </h2>
              <div>
                <label className="text-md">Bank Name</label>
                <input
                  type="text"
                  name="bank"
                  onChange={handleChange}
                  placeholder="e.g. Bank of America"
                  className="w-full rounded-xl px-4 py-3 text-lg sm:text-xl border border-white/40 bg-white/60"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-4">
          <div className="flex items-center gap-2 w-full sm:w-1/3 h-4 bg-white/30 rounded-full">
            <motion.div
              className="h-full bg-[#28A745] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${steps[step]}%` }}
              transition={{ duration: 0.4 }}
            />
            <span className="ml-3 text-sm">{steps[step]}%</span>
          </div>

          <div className="flex gap-4">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 bg-red-400 cursor-pointer text-black px-5 py-2 rounded-full hover:bg-red-600 hover:text-white text-sm sm:text-base"
              >
                <HiArrowSmLeft /> Back
              </button>
            )}
            <button
              onClick={() => (step < 3 ? setStep(step + 1) : handleSubmit())}
              className="flex items-center gap-2 bg-green-600 cursor-pointer text-[#333] px-5 py-2 rounded-full hover:bg-green-700 hover:text-white text-sm sm:text-base"
            >
              {step < 3 ? 'Continue' : 'Submit'} <HiArrowNarrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
