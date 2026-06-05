'use client'

import { supabase } from '@/src/lib/supabase'
import { useEffect, useState, useRef } from 'react'
import {
 FaChurch,
 FaGlassCheers,
 FaRing
}
from 'react-icons/fa'
export default function Home() {

  const images = [
    '/imagenes/foto1.png',
    '/imagenes/foto2.png',
    '/imagenes/foto3.png',
    '/imagenes/foto4.png',
    '/imagenes/foto5.png',
    '/imagenes/foto6.png',
    '/imagenes/foto7.png'
  ]
  const [currentImage, setCurrentImage] = useState(0)

  const [timeLeft, setTimeLeft] = useState('')

const audioRef = useRef<HTMLAudioElement | null>(null)
const [musicPlaying, setMusicPlaying] = useState(false)

useEffect(() => {
  audioRef.current = new Audio('/music/music.mp3')
  audioRef.current.loop = true

  return () => {
    audioRef.current?.pause()
    audioRef.current = null
  }
}, [])

  const weddingDate = new Date('2026-08-01T14:30:00')
  const [showConfirm, setShowConfirm] = useState(false)

  const [guests, setGuests] = useState<any[]>([])

  const [selectedGuest, setSelectedGuest] =
    useState<any>(null)

  const [guestIndex, setGuestIndex] =
    useState(0)

  useEffect(() => {

    loadGuests()

  }, [])

  async function loadGuests() {

    const { data, error } = await supabase
      .from('invitados')
      .select('*')
      .order('nombre')

    if (!error && data) {

      setGuests(data)

    }

  }

  async function confirmAttendance(
    attendance: boolean
  ) {

    if (!selectedGuest) return

    const { error } = await supabase
      .from('invitados')
      .update({
        asistira: attendance,
        fecha_confirmacion:
          new Date().toISOString()
      })
.eq(
  'id',
  selectedGuest.id
)

    if (error) {

      alert('Error al confirmar')
      return

    }

    alert(
      attendance
        ? 'Gracias por confirmar tu asistencia'
        : 'Confirmación registrada'
    )

    setShowConfirm(false)

  }


  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage(prev =>
        prev === images.length - 1
          ? 0
          : prev + 1
      )

    }, 4000)

    return () =>
      clearInterval(interval)

  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      const now =
        new Date().getTime()

      const distance =
        weddingDate.getTime() - now

      if (distance <= 0) {

        setTimeLeft(
          '¡Ha llegado nuestro gran día!'
        )

        return

      }

      const days =
        Math.floor(
          distance /
          (1000 * 60 * 60 * 24)
        )

      const hours =
        Math.floor(
          (
            distance %
            (
              1000 *
              60 *
              60 *
              24
            )
          ) /
          (
            1000 *
            60 *
            60
          )
        )

      const minutes =
        Math.floor(
          (
            distance %
            (
              1000 *
              60 *
              60
            )
          ) /
          (
            1000 *
            60
          )
        )

      const seconds =
        Math.floor(
          (
            distance %
            (
              1000 *
              60
            )
          ) / 1000
        )

      setTimeLeft(
        `${days} días ${hours}h ${minutes}m ${seconds}s`
      )

    }, 1000)

    return () =>
      clearInterval(interval)

  }, [])

  useEffect(() => {

    if (
      guests.length > 0 &&
      !selectedGuest
    ) {

      setSelectedGuest(
        guests[0]
      )

    }

  }, [guests])

  const nextGuest = () => {

    if (
      guestIndex <
      guests.length - 1
    ) {

      const newIndex =
        guestIndex + 1

      setGuestIndex(newIndex)

      setSelectedGuest(
        guests[newIndex]
      )

    }

  }

  const prevGuest = () => {

    if (guestIndex > 0) {

      const newIndex =
        guestIndex - 1

      setGuestIndex(newIndex)

      setSelectedGuest(
        guests[newIndex]
      )

    }

  }

  return (

    <main className='bg-[#D6D0BC] text-[#040B40] overflow-hidden min-h-screen'>
<button
onClick={() => {
  if (!audioRef.current) return

  if (musicPlaying) {
    audioRef.current.pause()
  } else {
    audioRef.current.play()
  }

  setMusicPlaying(!musicPlaying)
}}
>

  {musicPlaying
    ? '⏸️ Pausar Música'
    : '🎵 Reproducir Música'}

</button>
      <section className='relative h-screen' >
<img
  src="/decoracion/flor-izquierda.png"
  className="
  absolute
  left-0
  bottom-0
  w-72
  z-10
  "
/>

<img
  src="/decoracion/flor-derecha.png"
  className="
  absolute
  right-0
  bottom-0
  w-72
  z-10
  "
/>
        <img
          src={images[currentImage]}
          alt='Boda'
          className='absolute inset-0 w-full h-full object-cover transition-all duration-1000'
        />

 <div className='absolute inset-0 bg-[#040B40]/60 backdrop-blur-[2px]' />

        <div className='relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6'>

          <p className='tracking-[10px] uppercase text-sm mb-6'>

            Nuestra Boda

          </p>

<h1
  style={{
    fontFamily: 'Great Vibes'
  }}
  className="text-8xl text-[#D4AF37]"
>
  A & A
</h1>
<h2 className="text-2xl md:text-5xl mt-4 font-serif">

  Adriana Aylin Maldonado Siles

</h2>

<p className="text-4xl my-4">

  &

</p>

<h2 className="text-2xl md:text-5xl font-serif">

  Aldair Osvaldo Lopez Sanchez

</h2>
          <p className='mt-8 text-2xl'>

            1 de Agosto de 2026

          </p>

          <p className='mt-2 text-xl'>

            Oruro - Bolivia

          </p>

          <div className='mt-10 bg-white/20 backdrop-blur-lg rounded-3xl p-6'>

            <h2 className='text-2xl font-bold mb-3'>

              Faltan

            </h2>

            <div className="grid grid-cols-4 gap-4">

  <div>
    <h3 className="text-4xl font-bold">
      {timeLeft.split(' ')[0]}
    </h3>
    <p>Días</p>
  </div>

  <div>
    <h3 className="text-4xl font-bold">
      {timeLeft.split(' ')[2]?.replace('h','')}
    </h3>
    <p>Horas</p>
  </div>

  <div>
    <h3 className="text-4xl font-bold">
      {timeLeft.split(' ')[3]?.replace('m','')}
    </h3>
    <p>Minutos</p>
  </div>

  <div>
    <h3 className="text-4xl font-bold">
      {timeLeft.split(' ')[4]?.replace('s','')}
    </h3>
    <p>Segundos</p>
  </div>

</div>

          </div>

        </div>

      </section>
<section className="py-24 bg-[#F6F1E7]">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

    <div>
      <h2 className="text-5xl mb-6" style={{ fontFamily: 'Great Vibes' }}>
        Nuestra Historia
      </h2>

      <p className="text-lg leading-8">
        Texto bonito aquí...
      </p>
    </div>

    <img
      src="/imagenes/foto1.png"
      className="rounded-3xl shadow-2xl"
    />

  </div>
</section>

<section className="py-24 bg-[#040B40] text-white">
  <h2 className="text-center text-5xl mb-16" style={{ fontFamily: 'Great Vibes' }}>
    Itinerario
  </h2>

  <div className="flex justify-center gap-10 flex-wrap">

    <div className="text-center">
      <p className="text-3xl">10:30</p>
      <p>Boda Civil</p>
    </div>

    <div className="text-center">
      <p className="text-3xl">14:30</p>
      <p>Religiosa</p>
    </div>

    <div className="text-center">
      <p className="text-3xl">16:00</p>
      <p>Fiesta</p>
    </div>

  </div>
</section>

      <section className='py-24 bg-[#D6D0BC]'>

        <div className='max-w-4xl mx-auto text-center px-6'>

          <h2 className='text-5xl font-serif mb-12'>

            Código de Vestimenta

          </h2>

          <div className='bg-white rounded-[40px] p-10 shadow-xl'>

            <h3 className='text-3xl font-bold mb-6'>

              Elegante Formal

            </h3>

            <p className='text-xl'>

              Agradecemos evitar prendas completamente blancas.

            </p>

            <div className='flex justify-center gap-6 mt-10'>

              <div className='w-16 h-16 rounded-full bg-[#040B40]' />

              <div className='w-16 h-16 rounded-full bg-[#0B4F2F]' />

              <div className='w-16 h-16 rounded-full bg-[#D6D0BC] border-2 border-gray-400' />

            </div>

          </div>

        </div>

      </section>

      <section className='py-24 bg-white'>

        <div className='max-w-5xl mx-auto text-center px-6'>

          <h2 className='text-5xl font-serif mb-12'>

            Mesa de Regalos

          </h2>

          <div className='grid md:grid-cols-2 gap-10'>

            <div className='bg-[#040B40] text-white rounded-[40px] p-10'>

              <h3 className='text-3xl font-bold mb-6'>

                Entrega Física

              </h3>

              <p className='text-xl'>

                Puedes entregar tu regalo antes de la boda en:

              </p>

              <p className='text-2xl font-bold mt-6'>

                Calama 497
                <br />
                La Paz - Bolivia

              </p>

            </div>

            <div className='bg-[#0B4F2F] text-white rounded-[40px] p-10'>

              <h3 className='text-3xl font-bold mb-6'>

                Regalo por QR

              </h3>

              <img
                src='/qr.png'
                alt='QR'
                className='w-64 mx-auto rounded-3xl bg-white p-4'
              />

            </div>

          </div>

        </div>

      </section>
      <section className='py-24 bg-[#040B40] text-white'>

        <div className='max-w-6xl mx-auto px-6'>

          <h2 className='text-center text-5xl font-serif mb-16'>

            Nuestros Momentos

          </h2>

          <div
 className="
 flex
 overflow-x-auto
 gap-4
 pb-4
 "
>

            {images.map((image, index) => (

              <img
                key={index}
                src={image}
                alt={`Foto ${index + 1}`}
                className='w-full h-72 object-cover rounded-[30px] shadow-xl hover:scale-105 transition-all duration-500'
              />

            ))}

          </div>

        </div>

      </section>

      <section className='py-24 bg-white'>

        <div className='max-w-5xl mx-auto text-center px-6'>

          <h2 className='text-5xl font-serif mb-10'>

            Un Versículo Especial

          </h2>

          <div className='bg-[#D6D0BC] rounded-[40px] p-12 shadow-xl'>

            <p className='text-3xl italic leading-relaxed'>

              "Y sobre todas estas cosas vestíos de amor,
              que es el vínculo perfecto."

            </p>

            <p className='mt-8 text-2xl font-bold'>

              Colosenses 3:14

            </p>

          </div>

        </div>

      </section>

      <a
        href='https://wa.me/59169580486'
        target='_blank'
        className='fixed left-6 bottom-6 z-40 bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl font-bold hover:scale-110 transition-all'
      >

        WhatsApp

      </a>

      <button
        onClick={() => setShowConfirm(true)}
        className='fixed right-6 bottom-6 z-40 bg-[#040B40] text-white px-8 py-4 rounded-full shadow-2xl animate-bounce hover:scale-105 transition-all'
      >

        Confirmar Asistencia

      </button>

      {
        showConfirm && (

          <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4'>

            <div
className="
bg-gradient-to-b
from-white
to-[#D6D0BC]
w-full
max-w-xl
rounded-[40px]
p-8
border-4
border-[#D4AF37]
shadow-[0_0_50px_rgba(212,175,55,.4)]
"
>

              <h2 className='text-4xl font-bold text-center mb-8 text-[#040B40]'>

                Confirmación de Asistencia

              </h2>

              {
                guests.length > 0 && (

                  <div>

                    <div className='flex justify-between items-center mb-8'>

                      <button
                        onClick={prevGuest}
                        className='bg-[#040B40] text-white w-12 h-12 rounded-full'
                      >

                        ←

                      </button>

                      <div className='text-center flex-1'>

                        <p className='text-2xl font-bold'>

                          {selectedGuest?.nombre}

                        </p>

                      </div>

                      <button
                        onClick={nextGuest}
                        className='bg-[#040B40] text-white w-12 h-12 rounded-full'
                      >

                        →

                      </button>

                    </div>

                    <div className='bg-[#D6D0BC] rounded-3xl p-6 text-center'>

                      <p className='text-xl'>

                        Invitaciones asignadas

                      </p>

                      <h3 className='text-6xl font-black mt-4 text-[#040B40]'>

                        {selectedGuest?.cantidad_invitados}

                      </h3>

                    </div>

                    <div className='grid grid-cols-2 gap-4 mt-8'>
                      <button
                        onClick={() =>
                          confirmAttendance(true)
                        }
                        className='bg-green-600 text-white p-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all'
                      >

                        Sí asistiré

                      </button>

                      <button
                        onClick={() =>
                          confirmAttendance(false)
                        }
                        className='bg-red-600 text-white p-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all'
                      >

                        No asistiré

                      </button>

                    </div>

                  </div>

                )
              }

              {
                guests.length === 0 && (

                  <div className='text-center'>

                    <p className='text-xl'>

                      Cargando invitados...

                    </p>

                  </div>

                )
              }

              <button
                onClick={() =>
                  setShowConfirm(false)
                }
                className='w-full mt-8 bg-slate-200 p-4 rounded-2xl font-bold'
              >

                Cerrar

              </button>

            </div>

          </div>

        )
      }

<footer
className="
bg-[#040B40]
text-white
py-20
text-center
"
>

<h2
style={{
 fontFamily:'Great Vibes'
}}
className="
text-7xl
text-[#D4AF37]
mb-4
"
>

A & A

</h2>

<p className="text-3xl">

01.08.2026

</p>

<p className="mt-4">

Oruro - Bolivia

</p>

</footer>

    </main>

  )

}