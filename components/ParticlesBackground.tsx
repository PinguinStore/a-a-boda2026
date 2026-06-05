'use client'

import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"

export default function ParticlesBackground() {
  const init = async (engine: any) => {
    await loadFull(engine)
  }

  return (
    <Particles
      init={init}
      options={{
        fullScreen: { enable: true, zIndex: 0 },
        particles: {
          color: { value: "#d4af37" },
          move: { enable: true, speed: 0.3 },
          opacity: { value: 0.5 },
          size: { value: 2 },
          number: { value: 40 }
        }
      }}
    />
  )
}