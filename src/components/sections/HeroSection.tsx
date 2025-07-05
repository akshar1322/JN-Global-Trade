'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useAnimation } from 'framer-motion'
import { useMousePosition } from '@/hooks/useMousePosition'
import { heroImages } from '@/data/herosectionimgs'
import Link from 'next/link'
import { ArrowRight } from 'react-feather'

export default function HeroSection() {
  const controls = useAnimation()
  const ref = useRef<HTMLDivElement>(null)
  const { x, y } = useMousePosition()
  const [currentImage, setCurrentImage] = useState<string>('')
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  // Random image selection and auto-update every 10 min
  useEffect(() => {
    const pickRandom = () => {
      const index = Math.floor(Math.random() * heroImages.length)
      setCurrentImage(heroImages[index])
    }
    pickRandom()
    const interval = setInterval(pickRandom, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Update mouse offset on client only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mouseX = x / window.innerWidth - 0.5
      const mouseY = y / window.innerHeight - 0.5
      setMouseOffset({ x: mouseX * 40, y: mouseY * 40 }) // Adjust multiplier to control movement intensity
    }
  }, [x, y])

  const imageVariants = {
    default: {
      x: mouseOffset.x,
      y: mouseOffset.y,
      transition: { type: 'tween' as const, ease: 'easeOut' as const, duration: 1 },
    },
    scroll: {
      y: 100,
      transition: { duration: 1.5, ease: 'easeOut' as const },
    },
  }

  return (
    <section ref={ref} className="relative flex items-center justify-center h-screen bg-white overflow-hidden">
      <motion.h1
        className="absolute z-10 text-[10vw] font-serif text-black leading-none"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Fine <span className="relative z-20">Jewelry</span>
      </motion.h1>

      {currentImage && (
        <motion.div
          className="absolute z-0 w-[500px] h-auto"
          animate="default"
          variants={imageVariants}
          initial="default"
        >
          <Image
            src={currentImage}
            alt="Hero Jewelry"
            width={500}
            height={700}
            className="rounded-xl object-cover"
            priority
          />
        </motion.div>
      )}

      <Link href="/products" className="absolute bottom-10 right-10 z-20">
        <motion.button
          className="w-20 h-20 rounded-full border border-black flex items-center justify-center text-sm"
          whileHover={{ scale: 1.1 }}
        >
          Shop All <ArrowRight className="ml-2 w-4 h-4" />
        </motion.button>
      </Link>
    </section>
  )
}
