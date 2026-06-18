import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface Props {
  nome1: string
  nome2: string
  fotoPrincipal: string
  onEnter: () => void
}

export function SplashScreen({ nome1, nome2, fotoPrincipal, onEnter }: Props) {
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Foto de fundo */}
          <motion.img
            src={fotoPrincipal}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: 'easeOut' }}
          />

          {/* Overlay gradiente */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.92) 100%)',
            }}
          />

          {/* Partículas de corações flutuantes */}
          {['❤️', '🫶🏼', '💕', '✨', '💖', '🌹'].map((e, i) => (
            <motion.div
              key={i}
              className="absolute text-lg pointer-events-none select-none"
              style={{ left: `${8 + i * 16}%`, bottom: '-5%' }}
              animate={{ y: [0, -(window.innerHeight * 1.2)], opacity: [0, 0.6, 0.6, 0] }}
              transition={{ duration: 6 + i * 0.8, repeat: Infinity, delay: i * 1.1, ease: 'easeOut' }}
            >
              {e}
            </motion.div>
          ))}

          {/* Conteúdo — posicionado na parte inferior */}
          <div className="relative z-10 h-full flex flex-col justify-end px-7 pb-14">

            {/* Tag superior */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center gap-2 mb-5"
            >
              <div className="h-px flex-1 bg-white/20 rounded-full" />
              <span className="text-white/50 text-[11px] uppercase tracking-[0.3em]">um presente especial</span>
              <div className="h-px flex-1 bg-white/20 rounded-full" />
            </motion.div>

            {/* Nomes grandes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mb-2"
            >
              <h1 className="text-5xl font-black text-white leading-none tracking-tight">
                {nome1}
              </h1>
              <div className="flex items-center gap-3 my-2">
                <div className="h-px w-8 bg-white/30 rounded-full" />
                <span className="text-2xl">❤️</span>
                <div className="h-px w-8 bg-white/30 rounded-full" />
              </div>
              <h1 className="text-5xl font-black leading-none tracking-tight" style={{ color: '#fbbf24' }}>
                {nome2}
              </h1>
            </motion.div>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-white/40 text-sm leading-relaxed mb-10 mt-3"
            >
              Uma história que vale cada segundo
            </motion.p>

            {/* Botão */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.5 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleEnter}
              className="relative overflow-hidden rounded-2xl px-12 py-4 text-white font-bold text-base w-full"
              style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.92), rgba(217,119,6,0.92))',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(245,158,11,0.45)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-2xl"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <span className="relative z-10 tracking-wide">Abrir Presente 🎁</span>
            </motion.button>

            {/* Rodapé */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="mt-5 text-white/20 text-xs text-center"
            >
              Feito com amor para {nome2} 🌹
            </motion.p>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
