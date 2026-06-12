'use client'
import { supabase } from '@/src/lib/supabase'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
<link
href="https://fonts.googleapis.com/css2?family=Parisienne&display=swap"
rel="stylesheet"
/>
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
  const videoUrl = '/videos/nuestra-historia.mp4'
  const [currentImage, setCurrentImage] = useState(0)
  const [timeLeft, setTimeLeft] = useState('')
const audioRef = useRef<HTMLAudioElement | null>(null)
const [musicPlaying, setMusicPlaying] = useState(false)
useEffect(() => {
  const preload = async () => {
    try {

      const imagePromises = images.map(src => {
        return new Promise(resolve => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = resolve
        })
      })

      const audioPromise = new Promise(resolve => {
        const audio = new Audio('/music/music.mp3')
        audio.oncanplaythrough = resolve
        audio.onerror = resolve
      })

      const videoPromise = new Promise(resolve => {
        const video = document.createElement('video')
        video.src = videoUrl
        video.preload = 'auto'
        video.oncanplaythrough = resolve
        video.onerror = resolve
      })

      setLoadingText('Preparando nuestra historia...')
      await Promise.all(imagePromises)

      setLoadingText('Cargando recuerdos...')
      await audioPromise

      setLoadingText('Preparando una sorpresa...')
      await videoPromise

      setTimeout(() => {
        setLoading(false)
      }, 1500)

    } catch {
      setLoading(false)
    }
  }

  preload()
}, [])
useEffect(() => {
  audioRef.current = new Audio('/music/music.mp3')
  audioRef.current.loop = true
  
  return () => {
    audioRef.current?.pause()
    audioRef.current = null
  }
}, [])
useEffect(() => {
  let timer: NodeJS.Timeout

  timer = setInterval(() => {
    window.scrollBy({
      top: 1,
      behavior: 'auto'
    })
  }, 10)

  return () => clearInterval(timer)
}, [])
useEffect(() => {
  audioRef.current = new Audio('/music/music.mp3')
  audioRef.current.loop = true

  const playMusic = async () => {
    try {
      await audioRef.current?.play()
      setMusicPlaying(true)
    } catch (err) {
      console.log('Autoplay bloqueado')
    }
  }

  playMusic()

  const unlockAudio = () => {
    audioRef.current?.play()
    setMusicPlaying(true)
    window.removeEventListener('click', unlockAudio)
  }

  window.addEventListener('click', unlockAudio)

  return () => {
    audioRef.current?.pause()
    window.removeEventListener('click', unlockAudio)
  }
}, [])
const [mode, setMode] = useState<'novio' | 'novia' | null>(null)
const [companionName, setCompanionName] = useState('')
  const weddingDate = new Date('2026-08-01T14:30:00')
  const [showConfirm, setShowConfirm] = useState(false)
  const [guests, setGuests] = useState<any[]>([])
  const filteredGuests = guests.filter(g => g.novios === mode)
  const [loading, setLoading] = useState(true)
const [loadingText, setLoadingText] = useState('Preparando nuestra historia...')
  const [selectedGuest, setSelectedGuest] =
    useState<any>(null)
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
async function confirmAttendance(attendance: boolean) {
  if (!selectedGuest) return

  const isCouple = selectedGuest.cantidad_invitados === 2
  const companion = isCouple ? companionName : ''

  let message = ''

  if (!attendance) {
    message = `Gracias por avisarnos. Alda y Adri.`
  } else {
    if (isCouple) {
      if (mode === 'novio') {
        message = `Gracias por invitarnos a su boda Alda y Adri, estaremos presentes ${selectedGuest.nombre} y ${companion}. Nos vemos ahí y compartiremos con ustedes.`
      } else {
        message = `Gracias por invitarnos a su boda Alda y Adri, estaremos presentes ${selectedGuest.nombre} y ${companion}. Nos vemos ahí y compartiremos con ustedes.`
      }
    } else {
      message = `Gracias por invitarnos a su boda Alda y Adri, estaré presente, atte ${selectedGuest.nombre}. Nos vemos ahí y compartiremos con ustedes, felicidades.`
    }
  }

  const { error } = await supabase
    .from('invitados')
    .update({
      asistira: attendance,
      pareja: companion || null,
      fecha_confirmacion: new Date().toISOString()
    })
    .eq('id', selectedGuest.id)

  if (error) {
    alert('Error al confirmar')
    return
  }

  const phone = '59169580486'
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')

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
  if (loading) {
  return (
    <div
      className="
      fixed inset-0
      bg-[#040B40]
      flex flex-col
      items-center
      justify-center
      text-white
      z-[9999]
      "
    >
      {/* Logo */}
      <h1
        className="text-7xl text-[#D4AF37] mb-6"
        style={{ fontFamily: 'Great Vibes' }}
      >
        A & A
      </h1>

      {/* Anillo girando */}
      <div
        className="
        w-16
        h-16
        border-4
        border-[#D4AF37]/30
        border-t-[#D4AF37]
        rounded-full
        animate-spin
        mb-8
        "
      />

      {/* Texto dinámico */}
      <p
        className="text-3xl text-center px-6"
        style={{ fontFamily: 'Parisienne' }}
      >
        {loadingText}
      </p>

      <p className="mt-6 text-sm opacity-70">
        Estamos preparando una experiencia especial para ti...
      </p>
    </div>
  )
}
  return (
    <main
className="
bg-[#020F3A]
text-white
"
style={{
  backgroundImage:
    "url('/decoracion/textura.jpg')",
  backgroundRepeat: 'repeat-y',
  backgroundSize: '100% auto'
}}
>
    <section className='relative h-screen' >
<img
  src="/decoracion/flor-izquierda.png"
  className="
  absolute
  left-0
  bottom-0
  w-22
  z-10
  "
/>

<img
  src="/decoracion/flor-derecha.png"
  className="
  absolute
  right-0
  bottom-0
  w-22
  z-10
  "
/>
        <img
          src={images[currentImage]}
          alt='Boda'
          className='absolute inset-0 w-full h-full object-cover transition-all duration-1000'
        />

 <div className='absolute inset-0 bg-[#040B40]/60 backdrop-blur-[2px]' />

       <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6">

  <p className="tracking-[8px] uppercase text-sm mb-4">
    NUESTRA BODA
  </p>

  <h1
    className="text-6xl md:text-8xl text-[#D4AF37]"
    style={{ fontFamily: 'Great Vibes' }}
  >
    A & A
  </h1>

  <h2 className="text-xl md:text-4xl mt-4 font-serif">
    Adriana Aylin Maldonado Siles
  </h2>

  <p className="text-3xl my-2">&</p>

  <h2 className="text-xl md:text-4xl font-serif">
    Aldair Osvaldo Lopez Sanchez
  </h2>

  <p className="mt-6 text-lg md:text-2xl" style={{
  fontFamily: 'Parisienne'
}}>
    01 DE AGOSTO DE 2026
  </p>

  <p className="text-sm md:text-lg" style={{
  fontFamily: 'Parisienne'
}}>
    Oruro - Bolivia
  </p>
<div className="mt-8 bg-black/30 backdrop-blur-md rounded-2xl p-6 w-full max-w-md">

  <p className="text-lg mb-4" style={{
  fontFamily: 'Parisienne'
}}>FALTAN</p>

  <div className="grid grid-cols-4 text-center gap-2">

    <div>
      <p className="text-3xl font-bold">{timeLeft.split(' ')[0]}</p>
      <p className="text-xs">DÍAS</p>
    </div>

    <div>
      <p className="text-3xl font-bold">{timeLeft.split(' ')[2]?.replace('h','')}</p>
      <p className="text-xs">HORAS</p>
    </div>

    <div>
      <p className="text-3xl font-bold">{timeLeft.split(' ')[3]?.replace('m','')}</p>
      <p className="text-xs">MIN</p>
    </div>

    <div>
      <p className="text-3xl font-bold">{timeLeft.split(' ')[4]?.replace('s','')}</p>
      <p className="text-xs">SEG</p>
    </div>

  </div>
</div>
        </div>
      </section>

<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>
  <section className="py-20 bg-[#F6F1E7] relative overflow-hidden">


  {/* Decoración derecha */}
  <img
    src="/decoracion/flor-derecha2.png"
    className="
    absolute
    right-0
    top-0
    w-100
    md:w-52
    opacity-70
    "
  />

  <div className="max-w-5xl mx-auto px-6">
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="gold-particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }}
    />
  ))}
</div>
    <div className="grid md:grid-cols-2 gap-10 items-center">

      <div className="order-2 md:order-1">

        {/* BLOQUE HISTORIA */}
        <div className="text-center">

          <h2
            className="text-5xl md:text-7xl text-[#2F3E34]"
            style={{ fontFamily: 'Great Vibes' }}
          >
            Nuestra Historia
          </h2>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-20 md:w-32 h-[2px] bg-[#D4C38A]" />
            <span className="text-2xl text-[#8A9573]">♥</span>
            <div className="w-20 md:w-32 h-[2px] bg-[#D4C38A]" />
          </div>

          <p className="text-lg md:text-xl leading-relaxed text-[#2F2F2F]">

            Desde que nuestros caminos se cruzaron,
            supimos que Dios tenía un plan perfecto
            para nosotros.

            <br /><br />

            Hoy, después de tantas aventuras,
            aprendizajes y momentos inolvidables,
            hemos decidido unir nuestras vidas
            para siempre.

          </p>

          <p
            className="mt-8 text-2xl md:text-4xl text-[#6E8068]"
            style={{ fontFamily: 'Great Vibes' }}
          >
            ¡Te invitamos a ser parte de este nuevo capítulo!
          </p>

        </div>

      </div>

      <div className="order-1 md:order-2">

        <img
          src="/imagenes/foto1.png"
          className="
          rounded-[40px]
          shadow-2xl
          w-full
          object-cover
          "
        />
      </div>
    </div>
  </div>
</section>
</motion.section>


<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg "
>
  <section
className="relative py-24 overflow-hidden"
style={{
  backgroundColor: 'rgba(4,11,64,0.78)'
}}
>

  {/* Decoraciones */}
  <img
    src="/decoracion/flor-izquierda.png"
    className="absolute left-0 top-0 w-40 md:w-72 opacity-20"
    alt=""
  />

  <img
    src="/decoracion/flor-derecha.png"
    className="absolute right-0 bottom-0 w-40 md:w-72 opacity-20"
    alt=""
  />



  <div className="max-w-3xl mx-auto">
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="gold-particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }}
    />
  ))}
</div>
  <div
    className="
      bg-white/10
      backdrop-blur-md
      rounded-[40px]
      p-10 md:p-14
      border border-[#D4AF37]/40
      shadow-[0_0_40px_rgba(212,175,55,.15)]
      text-center
    "
  >

    {/* PADRES DEL NOVIO */}

    <div className="flex items-center gap-4 mb-6">
      <div className="flex-1 h-[1px] bg-[#D4AF37]" />
      <span
        style={{ fontFamily: 'Great Vibes' }}
        className="text-4xl text-[#D4AF37]"
      >
        ♡
      </span>
      <div className="flex-1 h-[1px] bg-[#D4AF37]" />
    </div>

    <h3
      style={{ fontFamily: 'Great Vibes' }}
      className="text-3xl md:text-4xl text-white mb-5"
    >
      Padres del Novio
    </h3>

    <p className="text-white text-lg md:text-xl leading-relaxed">
      Ruy Osbaldo Lopez Lozano
    </p>

    <p className="text-[#D4AF37] text-3xl my-5">
      &
    </p>

    <p className="text-white text-lg md:text-xl leading-relaxed">
      Zulema Sanchez Ortiz
    </p>

    {/* Separador */}

    <div className="flex items-center gap-4 my-12">
      <div className="flex-1 h-[1px] bg-[#D4AF37]" />
      <span className="text-[#D4AF37] text-4xl">
        ♡
      </span>
      <div className="flex-1 h-[1px] bg-[#D4AF37]" />
    </div>

    {/* PADRES DE LA NOVIA */}

    <h3
      style={{ fontFamily: 'Great Vibes' }}
      className="text-3xl md:text-4xl text-white mb-5"
    >
      Padres de la Novia
    </h3>

    <p className="text-white text-lg md:text-xl leading-relaxed">
      Hernan Maldonado Bellanos
    </p>

    <p className="text-[#D4AF37] text-3xl my-5">
      &
    </p>

    <p className="text-white text-lg md:text-xl leading-relaxed">
      Tatiana Siles Alvarado
    </p>

    <div className="flex items-center gap-4 mt-12">
      <div className="flex-1 h-[1px] bg-[#D4AF37]" />
      <span className="text-[#D4AF37] text-4xl">
        ♡
      </span>
      <div className="flex-1 h-[1px] bg-[#D4AF37]" />
    </div>
{/* Separador */}
<div className="flex items-center gap-4 my-10">
  <div className="flex-1 h-[1px] bg-[#D4AF37]" />
  <span className="text-[#D4AF37] text-2xl">✦</span>
  <div className="flex-1 h-[1px] bg-[#D4AF37]" />
</div>

<h3
  style={{ fontFamily: 'Great Vibes' }}
  className="text-4xl text-[#D4AF37] mb-4"
>
  Padrinos de Civil
</h3>

<p className="text-lg text-white">
  Saul Alberto Sanchez Ortiz
</p>

<p className="text-[#D4AF37] my-2">&</p>

<p className="text-lg text-white">
  Clara Magda Fernandez Sandoval
</p>

<div className="flex items-center gap-4 my-10">
  <div className="flex-1 h-[1px] bg-[#D4AF37]" />
  <span className="text-[#D4AF37] text-2xl">✦</span>
  <div className="flex-1 h-[1px] bg-[#D4AF37]" />
</div>

<h3
  style={{ fontFamily: 'Great Vibes' }}
  className="text-4xl text-[#D4AF37] mb-4"
>
  Padrinos de Religión
</h3>

<p className="text-lg text-white">
  Rolando Maldonado Bellanos
</p>

<p className="text-[#D4AF37] my-2">&</p>

<p className="text-lg text-white">
  Rocisela Rojas Lopez
</p>
  </div>

</div>
</section>
</motion.section>


<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>
  <section
className="py-4 text-white"
style={{
  backgroundColor: 'rgba(4,11,64,0.78)'
}}
>
  <h2 className="text-center text-5xl mb-16" style={{ fontFamily: 'Great Vibes' }}>
    Ubicaciones
  </h2>
  <div
className="
bg-white/10
backdrop-blur-md
rounded-[35px]
p-8
border border-[#D4AF37]/30
shadow-xl
hover:scale-105
transition-all
"
>
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="gold-particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }}
    />
  ))}
</div>
<div className="text-center">

<div
className="
w-24
h-24
mx-auto
rounded-full
bg-[#0A4A35]
border-4
border-[#D4AF37]
flex
items-center
justify-center
"
>
<FaRing size={35}/>
</div>

<h3 className="text-4xl mt-4">
10:00
</h3>

<p>Boda Civil</p>
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.3007526541614!2d-67.1066688!3d-17.964739299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e2b118fd1078c1%3A0xb73c99c68f938a6f!2sSal%C3%B3n%20de%20Eventos%20%22Colonial%22!5e0!3m2!1ses-419!2sbo!4v1780708783308!5m2!1ses-419!2sbo"
width="100%"
height="180"
loading="lazy"
className="rounded-xl mt-4"
/>
</div>
<div className="text-center">

<div
className="
w-24
h-24
mx-auto
rounded-full
bg-[#0A4A35]
border-4
border-[#D4AF37]
flex
items-center
justify-center
"
>
<FaChurch size={35}/>
</div>

<h3 className="text-4xl mt-4">
14:30
</h3>

<p>Boda Religiosa
</p>
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.3942563840046!2d-67.11269612569615!3d-17.960385280008158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e2b0a4233d68f1%3A0xec30551c00b29df5!2sIglesia%20de%20San%20Gerardo!5e0!3m2!1ses-419!2sbo!4v1780709876286!5m2!1ses-419!2sbo"
width="100%"
height="180"
loading="lazy"
className="rounded-xl mt-10"
/>
</div>
<div className="text-center">

<div
className="
w-24
h-24
mx-auto
rounded-full
bg-[#0A4A35]
border-4
border-[#D4AF37]
flex
items-center
justify-center
"
>
<FaGlassCheers size={35}/>
</div>

<h3 className="text-4xl mt-4">
16:00
</h3>

<p>Fiesta</p>
<iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3795.3007526541614!2d-67.1066688!3d-17.964739299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e2b118fd1078c1%3A0xb73c99c68f938a6f!2sSal%C3%B3n%20de%20Eventos%20%22Colonial%22!5e0!3m2!1ses-419!2sbo!4v1780708783308!5m2!1ses-419!2sbo"
width="100%"
height="180"
loading="lazy"
className="rounded-xl mt-4"
/>
</div>
  </div>
  <section className="py-10 bg-[#F6F1E7] relative overflow-hidden">
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="gold-particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }}
    />
  ))}
</div>
  <h2
    className="text-center text-5xl md:text-6xl mb-14 text-[#040B40]"
    style={{ fontFamily: 'Great Vibes' }}
  >
    Itinerario
  </h2>

  <div className="max-w-5xl mx-auto px-4">

    <img
      src="/imagenes/itinerario.png"
      alt="Itinerario"
      className="w-full rounded-[30px] shadow-2xl"
    />

  </div>

</section>
<section className="py-10 bg-white relative overflow-hidden">

  <div className="max-w-5xl mx-auto px-6">

    <div className="bg-[#F6F1E7] rounded-[40px] p-10 text-center shadow-xl">

      <h2
        className="text-5xl mb-6 text-[#040B40]"
        style={{ fontFamily: 'Great Vibes' }}
      >
        Comparte tus Fotos
      </h2>

      <p className="text-lg mb-8 text-[#040B40]">
        Ayúdanos a guardar los mejores recuerdos de este día tan especial.
      </p>

      <a
        href="https://drive.google.com/drive/folders/1AX2KDfX4k8VSKxoEGv6b7VYsugjBNPSM"
        target="_blank"
      >
        <img
          src="/imagenes/qr-fotos.png"
          className="w-64 mx-auto hover:scale-105 transition"
        />
      </a>

      <p className="mt-6 text-[#040B40]">
        Escanea el código QR o haz clic sobre él.
      </p>

    </div>

  </div>

</section>
</section>
</motion.section>


<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>
  <section className="py-10 bg-[#F6F1E7] relative overflow-hidden">

  {/* Decoraciones */}
  <img
    src="/decoracion/flor-izquierda.png"
    className="
    absolute
    left-0
    top-1/2
    -translate-y-1/2
    w-24
    md:w-40
    opacity-80
    "
  />

  <img
    src="/decoracion/flor-derecha.png"
    className="
    absolute
    right-0
    top-1/2
    -translate-y-1/2
    w-24
    md:w-40
    opacity-80
    scale-x-[-1]
    "
  />

  <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
<div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="gold-particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }}
    />
  ))}
</div>
    <h2
      className="text-5xl md:text-7xl text-[#8A9573]"
      style={{ fontFamily: 'Great Vibes' }}
    >
      Código de vestimenta
    </h2>

    <h3
      className=" mt-4 text-2xl md:text-3xl font-bold text-[#040B40] animate-bounce
      " style={{
  fontFamily: 'Parisienne'
}}
    >
      FORMAL
    </h3>

    <div className="grid md:grid-cols-2 gap-10 mt-12">

      {/* MUJERES */}
      <div className="bg-white rounded-[30px] p-8 shadow-xl" style={{
  fontFamily: 'Parisienne'
}}>

        <img
          src="/imagenes/mujer-formal1.png"
          alt="Mujer"
          className="w-24 md:w-32 mx-auto"
        />

        <h4 className="text-3xl font-bold mt-4 text-[#040B40]" style={{
  fontFamily: 'Parisienne'
}}>
          MUJERES
        </h4>

        <p className="text-2xl font-semibold mt-2 text-gray-700">
          Vestido
        </p>

        <p className="mt-4 text-lg text-gray-700">
          Deja el blanco para la novia
        </p>
        <p className="mt-4 text-lg text-gray-700">
          Y el azul para las damas de honor
        </p>
      </div>

      {/* HOMBRES */}
      <div className="bg-white rounded-[30px] p-8 shadow-xl" style={{
  fontFamily: 'Parisienne'
}}>

        <img
          src="/imagenes/hombre-formal1.png"
          alt="Hombre"
          className="w-24 md:w-32 mx-auto"
        />

        <h4 className="text-3xl font-bold mt-4 text-[#040B40]">
          HOMBRES
        </h4>

        <p className="text-2xl font-semibold mt-2 text-gray-700">
          Traje
        </p>

        <p className="mt-4 text-lg text-gray-700">
          Evitar jeans de ser posible
        </p>

      </div>

    </div>
  </div>

</section>
</motion.section>


<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>
  <section className="relative py-4 bg-[#F5F3EE] overflow-hidden">

  {/* DECORACIONES */}
  <img
    src="/decoracion/flor-izquierda.png"
    className="
    absolute
    left-0
    top-20
    w-24
    md:w-36
    opacity-40
    "
  />

  <img
    src="/decoracion/flor-derecha.png"
    className="
    absolute
    right-0
    top-16
    w-20
    md:w-32
    opacity-40
    "
  />

  <div className="max-w-4xl mx-auto text-center px-6">

    {/* ICONO */}
    <img
      src="/imagenes/regalo.png"
      alt="Regalo"
      className="
      w-16
      md:w-20
      mx-auto
      mb-8
      opacity-70
      "
    />

    {/* TITULO */}
    <h2
      style={{ fontFamily: 'Great Vibes' }}
      className="
      text-6xl
      md:text-8xl
      text-[#9AA490]
      mb-10
      "
    >
      Sugerencia de Regalos
    </h2>

    {/* TEXTO */}
    <p className="text-2xl md:text-3xl font-semibold text-[#222] mb-8">
      ¡Te agradecemos mucho por tus regalos!
    </p>

    <p className="text-xl md:text-2xl text-[#222] leading-relaxed">
      Puedes dejarlos en la siguiente
      <br />
      dirección:
    </p>

    {/* BOTON */}
    <div className="mt-10">

      <a
        href="https://maps.app.goo.gl/1fmLzAaPDZmVdR6c9"
        target="_blank"
        className="
        inline-block
        bg-[#9AA490]
        text-white
        px-10
        py-4
        rounded-xl
        text-lg
        font-serif
        shadow-lg
        hover:scale-105
        transition-all
        "
      >
        VER UBICACIÓN
      </a>

    </div>

  </div>
{/* FOTOS */}
  <div className="bg-white rounded-[30px] p-8 shadow-lg">
    <img
      src="/imagenes/regalo1.png"
      className="w-16 mx-auto mb-4"
    />
    <h3
      style={{ fontFamily: 'Great Vibes' }}
      className="
      text-5xl
      text-[#9AA490]
      mb-4
      "
    >
      Regalo digital
    </h3>

    <p className="text-lg mb-6 font-serif text-[#9AA490]">
      Tu presencia es nuestro mejor regalo, pero si deseas tener un detalle con nosotros, puedes hacerlo escaneando el siguiente código QR.
    </p>
      <img
        src="/imagenes/qr-cuenta.png"
        alt="QR Fotos"
        className="
        w-40
        mx-auto
        hover:scale-105
        transition-all
        "
      />

    <p className="mt-4 text-sm text-gray-500">
      MUCHAS GRACIAS 
    </p>

  </div>
</section>
</motion.section>


<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>
        <section
className='py-24 text-white relative overflow-hidden'
style={{
  backgroundColor: 'rgba(4,11,64,0.78)'
}}
>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
  {[...Array(25)].map((_, i) => (
    <span
      key={i}
      className="gold-particle"
      style={{
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${8 + Math.random() * 8}s`
      }}
    />
  ))}
</div>
        <div className='max-w-6xl mx-auto px-6'>
          <h3
  className="
  text-center
  text-5xl
  text-[#D4AF37]
  mb-8
  "
  style={{ fontFamily: 'Great Vibes' }}
>
  El día que comenzó nuestro para siempre
</h3>
          <div className="mt-16 max-w-4xl mx-auto">

  <video
    autoPlay
    muted
    loop
    playsInline
    className="
    w-full
    rounded-[40px]
    shadow-2xl
    border-2
    border-[#D4AF37]
    "
  >
    <source
      src="/videos/nuestra-historia.mp4"
      type="video/mp4"
    />
  </video>

</div>
        </div>
      </section>
</motion.section>


<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>      <section className='py-24 bg-white'>
        <div className='max-w-5xl mx-auto text-center px-6'>
          <h2 className='text-5xl font-serif mb-10 text-[#9AA490]' style={{ fontFamily: 'Great Vibes' }}>
            Un Versículo Especial
          </h2>
          <div className='bg-[#D6D0BC] rounded-[40px] p-12 shadow-xl' style={{ fontFamily: 'Great Vibes' }}>
            <p className='text-3xl italic leading-relaxed text-[#00072E]' >
              "Y sobre todas estas cosas vestíos de amor,
              que es el vínculo perfecto."
            </p>
            <p className='mt-8 text-2xl font-bold text-[#9AA490]'>
              Colosenses 3:14
            </p>
          </div>
        </div>
      </section>
      </motion.section>



      <button
        onClick={() => setShowConfirm(true)}
        className="
fixed
right-6
bottom-6
z-40

blue-glass
text-[#F6F1E7]

px-8
py-4

rounded-full

border-2
border-[#D4AF37]

shadow-[0_0_25px_rgba(212,175,55,.35)]

hover:bg-[#0A1E73]
hover:scale-105

transition-all
duration-500

animate-bounce
"
      >
        Confirmar Asistencia
      </button>
      {
        showConfirm && (
<div className="fixed inset-0 blue-glass/85 backdrop-blur-md flex items-center justify-center z-50 p-4">

  <div
    className="
      relative
      w-full
      max-w-xl
      bg-gradient-to-b
      from-[#FAF7F0]
      to-[#EDE4D0]
      rounded-[40px]
      p-8
      border-[3px]
      border-[#D4AF37]
      shadow-[0_0_50px_rgba(212,175,55,.35)]
      overflow-hidden
    "
  >

    {/* decoración superior */}
    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-[#D4AF37] via-[#F7E7A9] to-[#D4AF37]" />

    {/* título */}
    <div className="text-center mb-8">

      <p className="uppercase tracking-[5px] text-sm text-[#A8893A]">
        Nuestra Boda
      </p>

      <h2
        style={{ fontFamily: 'Great Vibes' }}
        className="text-5xl text-[#040B40] mt-2"
      >
        Confirmación de Asistencia
      </h2>

      <div className="flex justify-center items-center gap-3 mt-4">
        <div className="w-20 h-[1px] bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-xl">♥</span>
        <div className="w-20 h-[1px] bg-[#D4AF37]" />
      </div>

    </div>

    {/* PASO 1 */}
    {!mode && (
      <div>

        <p className="text-center text-[#040B40] mb-6 text-lg">
          Seleccione la familia a la que pertenece
        </p>

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() => {
  setSelectedGuest(null)
  setCompanionName('')
  setMode('novio')
}}
            className="
              p-6
              rounded-3xl
              bg-gradient-to-b
              from-[#040B40]
              to-[#0A1E73]
              text-white
              shadow-xl
              hover:scale-105
              transition
            "
          >
            <div className="text-4xl mb-3">
              🤵
            </div>

            <div className="font-bold">
              Familia del Novio
            </div>
          </button>

          <button
            onClick={() => {
  setSelectedGuest(null)
  setCompanionName('')
  setMode('novia')
}}
            className="
              p-6
              rounded-3xl
              bg-gradient-to-b
              from-[#D4AF37]
              to-[#B78A1B]
              text-white
              shadow-xl
              hover:scale-105
              transition
            "
          >
            <div className="text-4xl mb-3">
              👰
            </div>

            <div className="font-bold">
              Familia de la Novia
            </div>
          </button>

        </div>
      </div>
    )}

    {/* PASO 2 */}
    {mode && !selectedGuest && (

      <div>

        <h3
          style={{ fontFamily: 'Great Vibes' }}
          className="text-4xl text-center text-[#040B40] mb-6"
        >
          Seleccione su nombre
        </h3>

        <div className="max-h-72 overflow-y-auto space-y-3 pr-2">

          {filteredGuests.map((g) => (

            <button
              key={g.id}
              onClick={() => setSelectedGuest(g)}
              className="
                w-full
                bg-white
                border-2
                border-[#E7D5A3]
                rounded-2xl
                p-4
                text-left
                hover:bg-[#FFF8E8]
                transition
              "
            >

              <div className="font-bold text-[#040B40]">
                {g.nombre}
              </div>

              <div className="text-sm text-[#7D6A2C] mt-1">
                Invitados: {g.cantidad_invitados}
              </div>

            </button>

          ))}

        </div>

        <button
          onClick={() => setMode(null)}
          className="
            mt-6
            w-full
            border
            border-[#040B40]
            text-[#040B40]
            p-3
            rounded-2xl
          "
        >
          ← Volver
        </button>

      </div>
    )}

    {/* PASO 3 */}
    {selectedGuest && (

      <div className="text-center">

        <h3
          style={{ fontFamily: 'Great Vibes' }}
          className="text-4xl text-[#040B40]"
        >
          {selectedGuest.nombre}
        </h3>

        <p className="mt-2 text-[#7D6A2C]">
          Invitaciones asignadas
        </p>

        <p className="text-6xl font-black text-[#D4AF37] mb-6">
          {selectedGuest.cantidad_invitados}
        </p>

        {selectedGuest.cantidad_invitados === 2 && (

          <input
            value={companionName}
            onChange={(e) =>
              setCompanionName(e.target.value)
            }
            placeholder="Nombre del acompañante"
            className="
              w-full
              p-4
              rounded-2xl
              border-2
              border-[#D4AF37]
              bg-white
              mb-6
            "
          />

        )}

        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={() =>
              confirmAttendance(true)
            }
            className="
              bg-green-600
              text-white
              p-4
              rounded-2xl
              font-bold
              shadow-lg
              hover:scale-105
              transition
            "
          >
            Confirmar ✓
          </button>

          <button
            onClick={() =>
              confirmAttendance(false)
            }
            className="
              bg-red-600
              text-white
              p-4
              rounded-2xl
              font-bold
              shadow-lg
              hover:scale-105
              transition
            "
          >
            No asistir
          </button>

        </div>

        <button
          onClick={() => {
            setSelectedGuest(null)
            setCompanionName('')
          }}
          className="
            mt-5
            text-[#040B40]
            underline
          "
        >
          ← Cambiar invitado
        </button>

      </div>
    )}

    {/* cerrar */}
    <button
      onClick={() => {
        setShowConfirm(false)
        setMode(null)
        setSelectedGuest(null)
        setCompanionName('')
      }}
      className="
        mt-8
        w-full
        blue-glass
        text-white
        p-4
        rounded-2xl
        font-semibold
      "
    >
      Cerrar
    </button>

  </div>

</div>
        )
      }
<motion.section
initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 0.8, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1 }}
className="wedding-bg"
>
  <footer
className="
text-white
py-20
text-center
"
>
<h2
style={{ fontFamily: 'Great Vibes' }}
className="
text-7xl
text-[#D4AF37]
mb-4
"
>
A & A
</h2>
<p className="text-3xl" style={{ fontFamily: 'Great Vibes' }}>
01.08.2026
</p>
<p className="mt-4" style={{ fontFamily: 'Great Vibes' }}>
Oruro - Bolivia
</p>
</footer>
</motion.section>

    </main>
  )
}