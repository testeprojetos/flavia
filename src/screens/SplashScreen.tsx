import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props {
  nome1: string
  nome2: string
  onEnter: () => void
}

const PARTICLES = [
  { e: '😍', x: 5,  delay: 0,    dur: 6 },
  { e: '💕', x: 15, delay: 0.8,  dur: 7 },
  { e: '😘', x: 25, delay: 1.4,  dur: 5 },
  { e: '🥰', x: 35, delay: 0.3,  dur: 8 },
  { e: '😍', x: 45, delay: 1.9,  dur: 6 },
  { e: '💕', x: 55, delay: 0.6,  dur: 7 },
  { e: '😘', x: 65, delay: 1.1,  dur: 5 },
  { e: '🥰', x: 75, delay: 2.2,  dur: 8 },
  { e: '😍', x: 85, delay: 0.4,  dur: 6 },
  { e: '💕', x: 92, delay: 1.6,  dur: 7 },
  { e: '😘', x: 10, delay: 3.0,  dur: 6 },
  { e: '🥰', x: 50, delay: 2.5,  dur: 5 },
  { e: '😍', x: 70, delay: 3.5,  dur: 7 },
  { e: '💕', x: 30, delay: 2.8,  dur: 8 },
  { e: '😘', x: 80, delay: 1.0,  dur: 6 },
]

export function SplashScreen({ nome1, nome2, onEnter }: Props) {
  const [exiting, setExiting] = useState(false)

  const handleEnter = () => {
    setExiting(true)
    setTimeout(onEnter, 900)
  }

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-50 overflow-hidden"
          style={{ background: '#080808' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Glow central */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 400, height: 400,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(233,30,140,0.1) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Emojis subindo */}
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute text-xl pointer-events-none select-none"
              style={{ left: `${p.x}%`, bottom: '-5%' }}
              animate={{ y: [0, -(window.innerHeight * 1.15)], opacity: [0, 0.7, 0.7, 0] }}
              transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeOut' }}
            >
              {p.e}
            </motion.div>
          ))}

          {/* Conteúdo centralizado */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
            <div className="w-full max-w-sm mx-auto flex flex-col items-center">

              {/* Ícone */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 180 }}
                className="mb-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-24 h-24 rounded-full flex items-center justify-center text-5xl"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1.5px solid rgba(255,255,255,0.12)',
                    boxShadow: '0 0 50px rgba(233,30,140,0.2)',
                  }}
                >
                  ❤️
                </motion.div>
              </motion.div>

              {/* Título */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
                className="text-3xl font-black text-white leading-snug mb-4"
              >
                <span style={{ color: '#f9a8d4' }}>{nome1}</span> preparou um{'\n'}presente especial{'\n'}para você ❤️
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-white/40 text-sm leading-relaxed mb-10"
              >
                Uma jornada pelos momentos mais{'\n'}incríveis da nossa história
              </motion.p>

              {/* Badge nomes */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="rounded-full px-6 py-2.5 mb-5 flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.13)',
                }}
              >
                <span className="text-white/80 font-semibold text-sm">{nome1}</span>
                <span className="text-base">❤️</span>
                <span className="text-white/80 font-semibold text-sm">{nome2}</span>
              </motion.div>

              {/* Botão */}
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleEnter}
                className="relative overflow-hidden rounded-full px-12 py-4 text-white font-bold text-base w-full"
                style={{
                  background: 'linear-gradient(135deg, #e91e8c, #c2185b)',
                  boxShadow: '0 8px 32px rgba(233,30,140,0.35)',
                }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.2 }}
                />
                <span className="relative z-10">Ver Presente</span>
              </motion.button>

              {/* Rodapé */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.6 }}
                className="mt-8 text-white/20 text-xs"
              >
                Feito com amor para {nome2} 🌹
              </motion.p>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
