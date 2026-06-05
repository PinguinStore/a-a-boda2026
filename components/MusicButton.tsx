'use client'

import { useRef, useState } from "react"

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/music.mp3')
      audioRef.current.loop = true
    }

    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setPlaying(!playing)
  }

  return (
    <>
      <audio ref={audioRef} />
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 bg-black/60 text-white px-4 py-2 rounded-full"
      >
        {playing ? "⏸️ Pausar" : "🎵 Música"}
      </button>
    </>
  )
}