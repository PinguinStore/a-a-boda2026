'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase'

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

  const weddingDate = new Date('2026-08-01T14:30:00')

  const [currentImage, setCurrentImage] = useState(0)

  const [timeLeft, setTimeLeft] = useState('')

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
        'identificación',
        selectedGuest.identificación
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

    const audio =
      new Audio('/music/music.mp3')

    audio.loop = true

    const playMusic = () => {

      audio.play().catch(() => {})

      document.removeEventListener(
        'click',
        playMusic
      )

    }

    document.addEventListener(
      'click',
      playMusic
    )

    return () => audio.pause()

  }, [])

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

      <section className='relative h-screen'>

        <img
          src={images[currentImage]}
          alt='Boda'
          className='absolute inset-0 w-full h-full object-cover transition-all duration-1000'
        />

        <div className='absolute inset-0 bg-black/50' />

        <div className='relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6'>

          <p className='tracking-[10px] uppercase text-sm mb-6'>

            Nuestra Boda

          </p>

          <h1 className='text-5xl md:text-8xl font-serif leading-tight'>

            Adriana
            <br />
            &
            <br />
            Aldair

          </h1>

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

            <p className='text-2xl'>

              {timeLeft}

            </p>

          </div>

        </div>

      </section>
      <section className='py-24 px-6 bg-white'>

        <div className='max-w-5xl mx-auto text-center'>

          <h2 className='text-5xl font-serif mb-10'>

            Nuestra Historia

          </h2>

          <p className='text-xl leading-10'>

            Con inmensa alegría y gratitud a Dios,
            queremos compartir con ustedes el día
            más importante de nuestras vidas.

            <br /><br />

            Después de un hermoso camino recorrido juntos,
            lleno de amor, sueños, aprendizajes y bendiciones,
            hemos decidido unir nuestras vidas para siempre.

            <br /><br />

            Nos sentimos felices de celebrar este momento tan especial
            junto a las personas que más queremos.

          </p>

          <div className='mt-16'>

            <img
              src='/imagenes/foto1.png'
              alt='Nosotros'
              className='w-full max-w-2xl mx-auto rounded-[40px] shadow-2xl'
            />

          </div>

        </div>

      </section>

      <section className='py-24 bg-[#040B40] text-white'>

        <div className='max-w-6xl mx-auto px-6'>

          <h2 className='text-center text-5xl font-serif mb-16'>

            Cronograma

          </h2>

          <div className='grid md:grid-cols-3 gap-8'>

            <div className='bg-white text-[#040B40] rounded-3xl p-8 shadow-xl'>

              <h3 className='text-4xl font-bold mb-4'>

                10:30

              </h3>

              <p className='text-2xl font-semibold'>

                Boda Civil

              </p>

              <p className='mt-4'>

                Salón de Eventos Colonial

              </p>

              <a
                href='https://maps.google.com/?q=Salon+de+Eventos+Colonial+Oruro'
                target='_blank'
                className='inline-block mt-6 bg-[#0B4F2F] text-white px-6 py-3 rounded-full'
              >

                Ver Ubicación

              </a>

            </div>

            <div className='bg-[#0B4F2F] rounded-3xl p-8 shadow-xl'>

              <h3 className='text-4xl font-bold mb-4'>

                14:30

              </h3>

              <p className='text-2xl font-semibold'>

                Boda Religiosa

              </p>

              <p className='mt-4'>

                Iglesia San Gerardo

              </p>

              <a
                href='https://maps.google.com/?q=Iglesia+San+Gerardo+Oruro'
                target='_blank'
                className='inline-block mt-6 bg-white text-[#0B4F2F] px-6 py-3 rounded-full font-bold'
              >

                Ver Ubicación

              </a>

            </div>

            <div className='bg-white text-[#040B40] rounded-3xl p-8 shadow-xl'>

              <h3 className='text-4xl font-bold mb-4'>

                16:00

              </h3>

              <p className='text-2xl font-semibold'>

                Recepción

              </p>

              <p className='mt-4'>

                Salón de Eventos Colonial

              </p>

              <a
                href='https://maps.google.com/?q=Salon+de+Eventos+Colonial+Oruro'
                target='_blank'
                className='inline-block mt-6 bg-[#040B40] text-white px-6 py-3 rounded-full'
              >

                Ver Ubicación

              </a>

            </div>

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

          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>

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

            <div className='bg-white w-full max-w-xl rounded-[40px] p-8'>

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

      <footer className='bg-[#040B40] text-white py-10 text-center'>

        <p className='text-xl'>

          Adriana Aylin Maldonado Siles
          <br />
          &
          <br />
          Aldair Osvaldo Lopez Sanchez

        </p>

        <p className='mt-4'>

          1 de Agosto de 2026 · Oruro, Bolivia

        </p>

      </footer>

    </main>

  )

}