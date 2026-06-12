"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);
const [frame, setFrame] = useState(0);

const frames = [
  "/invitacion/invi_1.png",
  "/invitacion/invi_2.png",
  "/invitacion/invi_3.png",
  "/invitacion/invi_4.png",
  "/invitacion/invi_5.png",
  "/invitacion/invi_6.png",
];
useEffect(() => {
  const preloadImages = async () => {
    const allImages = [
      "/portada/top.png",
      "/portada/left.png",
      "/portada/right.jpg",
      "/portada/bottom.png",
      "/portada/monograma.png",
      "/portada/sobre.png",
      ...frames
    ];

    const promises = allImages.map((src) => {
      return new Promise((resolve) => {
        const img = new window.Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    await Promise.all(promises);

    setTimeout(() => {
      setAssetsLoaded(true);
    }, 500);
  };

  preloadImages();
}, []);
const [assetsLoaded, setAssetsLoaded] = useState(false);
const [loadingText, setLoadingText] = useState("Preparando invitación...");
const abrirInvitacion = () => {
  if (opening) return;

  setOpening(true);
};
useEffect(() => {
  if (!opening) return;

  let current = 0;

  const interval = setInterval(() => {
    current++;

    if (current < frames.length) {
      setFrame(current);
    } else {
      clearInterval(interval);

      setTimeout(() => {
        router.push("/invi");
      }, 400);
    }
  }, 250);

  return () => clearInterval(interval);
}, [opening, router]);
if (!assetsLoaded) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center">
      
      <div className="text-center">
        
        <h1
          className="text-6xl text-[#927e61] mb-6"
          style={{ fontFamily: "Great Vibes" }}
        >
          A & A
        </h1>

        <div
          className="
          w-14 h-14
          border-4
          border-[#d8c5a6]
          border-t-[#927e61]
          rounded-full
          animate-spin
          mx-auto
          mb-6
          "
        />

        <p className="text-[#927e61] tracking-[2px]">
          Preparando tu invitación...
        </p>

      </div>

    </div>
  );
}
  return (
    <main className="bg-white min-h-screen flex justify-center">
      <div className="relative w-full max-w-[430px] bg-white overflow-hidden">

        {/* FLORES SUPERIORES */}
        <Image
          src="/portada/top.png"
          alt=""
          width={300}
          height={100}
          className="w-full"
          priority
        />

        {/* FLORES LATERALES */}
        <Image
          src="/portada/left.png"
          alt=""
          width={120}
          height={300}
          className="absolute left-0 top-[150px] w-[95px]"
        />

        <Image
          src="/portada/right.jpg"
          alt=""
          width={120}
          height={300}
          className="absolute right-0 top-[150px] w-[95px]"
        />

        {/* CONTENIDO */}
        <div className="flex flex-col items-center pt-10 px-4">

          {/* MONOGRAMA */}
          <Image
            src="/portada/monograma.png"
            alt=""
            width={180}
            height={180}
            className="mb-8"
          />

          {/* FECHA */}
          <p className="tracking-[7px] text-[#927e61] text-sm mb-10">
            01 · 08 · 2026
          </p>

          {/* SOBRE */}
<motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.97 }}
  onClick={abrirInvitacion}
  className="cursor-pointer relative"
>
  <Image
    src={opening ? frames[frame] : "/portada/sobre.png"}
    alt="Invitación"
    width={320}
    height={220}
    priority
    className="w-[280px] md:w-[320px] h-auto drop-shadow-2xl"
  />
</motion.div>

{!opening && (
  <p className="mt-6 text-center text-[11px] tracking-[2px] text-[#7f725d]">
    PRESIONA EL SOBRE PARA ABRIR
    <br />
    TU INVITACIÓN
  </p>
)}
        </div>

        {/* FLORES INFERIORES */}
        <div className="mt-12">
          <Image
            src="/portada/bottom.png"
            alt=""
            width={430}
            height={200}
            className="w-full"
          />
        </div>
      </div>
    </main>
  );
}