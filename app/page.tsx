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

  useEffect(() => {

    loadGuests()

  }, [])

  const loadGuests = async () => {

    const { data, error } = await supabase
      .from('invitados')
      .select('*')
      .order('nombre')

    if (error) {

      console.error(error)
      return

    }

    setGuests(data || [])

  }

  const confirmAttendance = async (
    attendance: boolean
  ) => {

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
      console.error(error)
      return

    }

    alert('Confirmación registrada')

    setShowConfirm(false)

    loadGuests()

  }

  useEffect(() => {

    const audio = new Audio('/music/music.mp3')

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

    return () => {

      audio.pause()

    }

  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      setCurrentImage(prev =>
        prev === images.length - 1
          ? 0
          : prev + 1
      )

    }, 4000)

    return () => clearInterval(interval)

  }, [])

  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date().getTime()

      const distance =
        weddingDate.getTime() - now

      if (distance <= 0) {

        setTimeLeft(
          '¡Ya llegó el gran día!'
        )

        return

      }

      const days = Math.floor(
        distance /
        (1000 * 60 * 60 * 24)
      )

      const hours = Math.floor(
        (
          distance %
          (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (
          distance %
          (1000 * 60 * 60)
        ) /
        (1000 * 60)
      )

      const seconds = Math.floor(
        (
          distance %
          (1000 * 60)
        ) /
        1000
      )

      setTimeLeft(
        `${days} días ${hours}h ${minutes}m ${seconds}s`
      )

    }, 1000)

    return () => clearInterval(interval)

  }, [])

  return (

    <main className='min-h-screen bg-[#D6D0BC] text-[#040B40]'>

      {/* Tu contenido existente */}

      <button
        onClick={() =>
          setShowConfirm(true)
        }
        className='fixed bottom-6 right-6 bg-[#040B40] text-white px-8 py-4 rounded-full shadow-2xl animate-bounce'
      >
        Confirmar Asistencia
      </button>

      {
        showConfirm && (

          <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>

            <div className='bg-white p-8 rounded-3xl w-[95%] max-w-lg'>

              <h2 className='text-3xl font-bold text-center mb-6'>

                Confirmación de Asistencia

              </h2>

              <select
                className='w-full border p-4 rounded-2xl'
                onChange={(e) => {

                  const guest =
                    guests.find(
                      guest =>
                        guest.identificación ===
                        Number(
                          e.target.value
                        )
                    )

                  setSelectedGuest(
                    guest
                  )

                }}
              >

                <option value=''>
                  Seleccione su nombre
                </option>

                {
                  guests.map(
                    (guest) => (

                      <option
                        key={
                          guest.identificación
                        }
                        value={
                          guest.identificación
                        }
                      >

                        {guest.nombre}

                      </option>

                    )
                  )
                }

              </select>

              {
                selectedGuest && (

                  <div className='mt-8'>

                    <p className='text-center'>

                      Invitaciones asignadas

                    </p>

                    <h3 className='text-center text-5xl font-black mt-3'>

                      {
                        selectedGuest.cantidad_invitados
                      }

                    </h3>

                    <div className='grid grid-cols-2 gap-4 mt-8'>

                      <button
                        onClick={() =>
                          confirmAttendance(
                            true
                          )
                        }
                        className='bg-green-600 text-white p-4 rounded-2xl'
                      >

                        Sí asistiré

                      </button>

                      <button
                        onClick={() =>
                          confirmAttendance(
                            false
                          )
                        }
                        className='bg-red-600 text-white p-4 rounded-2xl'
                      >

                        No asistiré

                      </button>

                    </div>

                  </div>

                )
              }

              <button
                onClick={() =>
                  setShowConfirm(
                    false
                  )
                }
                className='w-full mt-6 bg-slate-200 p-3 rounded-xl'
              >

                Cerrar

              </button>

            </div>

          </div>

        )
      }

    </main>

  )
}