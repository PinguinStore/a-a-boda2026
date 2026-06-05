'use client'

import { motion } from "framer-motion"

export default function Hero({ image, timeLeft }: any) {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">

      <img
        src={image}
        className="absolute w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >

        <p className="tracking-[10px] uppercase">
          NUESTRA BODA
        </p>

        <h1 className="text-7xl font-serif text-[#D4AF37]">
          A & A
        </h1>

        <p className="text-2xl mt-4">
          Adriana & Aldair
        </p>

        <p className="mt-6 text-lg">
          {timeLeft}
        </p>

      </motion.div>

    </section>
  )
}