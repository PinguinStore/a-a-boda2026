'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Gallery({ images }: any) {
  return (
    <div className="py-10 bg-black">

      <Swiper spaceBetween={10} slidesPerView={2.2} loop>
        {images.map((img: string, i: number) => (
          <SwiperSlide key={i}>
            <img
              src={img}
              className="rounded-2xl h-64 object-cover w-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  )
}