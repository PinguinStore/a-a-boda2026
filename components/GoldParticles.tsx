'use client'

import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'

export default function GoldParticles() {
  const particlesInit = async (engine: any) => {
    await loadFull(engine)
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 z-0"
      options={{
        fullScreen: false,

        particles: {
          number: {
            value: 40
          },

          color: {
            value: '#D4AF37'
          },

          opacity: {
            value: 0.5,
            random: true
          },

          size: {
            value: { min: 1, max: 4 }
          },

          move: {
            enable: true,
            speed: 1,
            direction: 'bottom',
            straight: false
          },

          shape: {
            type: 'circle'
          }
        },

        detectRetina: true,

        background: {
          color: 'transparent'
        }
      }}
    />
  )
}