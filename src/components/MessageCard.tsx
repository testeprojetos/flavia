import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFadeInView } from '../hooks/useFadeInView'
import { usePlayer } from '../context/PlayerContext'

interface Props {
  mensagem: string
  nome1: string
  nome2: string
  musicaTitulo: string
  musicaArtista: string
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MessageCard({ mensagem, musicaTitulo, musicaArtista }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useFadeInView()
  const { bgColor, playing, progress, currentSec, duration, togglePlay, seek } = usePlayer()

  // Preview: primeiras ~120 chars
  const preview = mensagem.slice(0, 120)

  const remaining = duration - currentSec

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    seek(((e.clientX - rect.left) / rect.width) * 100)
  }

  return (
    <>
      {/* ── Card no dashboard ── */}
      <div
        ref={ref}
        className="mx-4 mb-4 rounded-3xl overflow-hidden relative"
        style={{ background: bgColor }}
      >
        <div className="p-5">
          {/* Label */}
          <p className="text-white font-bold text-base mb-4">Mensagem especial</p>

          {/* Preview texto estilo letra */}
          <p className="text-white font-black text-2xl leading-snug mb-2">
            {preview}
          </p>
          {mensagem.length > 120 && (
            <p className="text-white/40 font-black text-2xl leading-snug mb-5">
              {mensagem.slice(120, 200)}
              {mensagem.length > 200 ? '-' : ''}
            </p>
          )}

          {/* Botão */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpen(true)}
            className="rounded-full px-6 py-3 text-sm font-bold"
            style={{ background: 'white', color: '#1a1a2e' }}
          >
            Mostrar Mensagem
          </motion.button>
        </div>
      </div>

      {/* ── Tela de mensagem completa ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: bgColor }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-10 pb-4 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.88 }}
                onClick={() => setOpen(false)}
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.25)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </motion.button>

              <div className="flex flex-col items-center">
                <span className="text-white font-bold text-sm">{musicaTitulo}</span>
                <span className="text-white/60 text-xs">{musicaArtista}</span>
              </div>

              <div className="w-9 h-9" />
            </div>

            {/* Texto da mensagem — estilo letra do Spotify */}
            <div className="flex-1 overflow-y-auto px-5 pb-4">
              {mensagem.split('\n').map((line, i) => {
                if (line === '') return <div key={i} className="h-6" />
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.03, duration: 0.4 }}
                    className="text-white font-black text-2xl leading-snug mb-1"
                  >
                    {line}
                  </motion.p>
                )
              })}
              <div className="h-4" />
            </div>

            {/* Mini-player fixo no rodapé */}
            <div className="flex-shrink-0 px-5 pb-8 pt-2">
              {/* Progress bar */}
              <div
                className="relative w-full h-1 rounded-full cursor-pointer mb-1.5"
                style={{ background: 'rgba(255,255,255,0.3)' }}
                onClick={handleSeek}
              >
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-white"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>
              <div className="flex justify-between mb-5">
                <span className="text-white/70 text-[11px] font-medium">{formatTime(currentSec)}</span>
                <span className="text-white/70 text-[11px] font-medium">
                  {remaining > 0 ? `-${formatTime(remaining)}` : formatTime(duration)}
                </span>
              </div>

              {/* Play/Pause centralizado */}
              <div className="flex justify-center">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: 'white', boxShadow: '0 6px 24px rgba(0,0,0,0.35)' }}
                >
                  {playing
                    ? <svg width="26" height="26" viewBox="0 0 24 24" fill="#1a1a2e"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                    : <svg width="26" height="26" viewBox="0 0 24 24" fill="#1a1a2e" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z"/></svg>
                  }
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
