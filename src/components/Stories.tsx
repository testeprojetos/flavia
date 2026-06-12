import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Howl } from 'howler'
import type { Album } from '../types'

interface Props {
  album: Album
  onClose: () => void
}

const STORY_DURATION = 4000

export function Stories({ album, onClose }: Props) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const howlRef = useRef<Howl | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef(0)
  const elapsedRef = useRef(0)
  // Impede que o toque de swipe dispare também o click
  const swipedRef = useRef(false)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const total = album.stories.length

  // ── Bloqueia scroll do body enquanto stories estiver aberto
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  // ── Música do álbum
  useEffect(() => {
    if (!album.musica) return
    const sound = new Howl({ src: [album.musica], html5: true, volume: 0.7 })
    howlRef.current = sound
    sound.play()
    return () => { sound.stop(); sound.unload() }
  }, [album.musica])

  // ── Timer do progresso
  const startTimer = useCallback((fromElapsed = 0) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    elapsedRef.current = fromElapsed
    startTimeRef.current = Date.now() - fromElapsed

    intervalRef.current = setInterval(() => {
      elapsedRef.current = Date.now() - startTimeRef.current
      const pct = Math.min((elapsedRef.current / STORY_DURATION) * 100, 100)
      setProgress(pct)

      if (elapsedRef.current >= STORY_DURATION) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setCurrent((c) => {
          if (c < total - 1) return c + 1
          onClose()
          return c
        })
      }
    }, 50)
  }, [total, onClose])

  // Reinicia timer ao trocar de story
  useEffect(() => {
    setProgress(0)
    elapsedRef.current = 0
    if (!paused) startTimer(0)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  // Pausa / retoma
  useEffect(() => {
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current)
    } else {
      startTimer(elapsedRef.current)
    }
  }, [paused, startTimer])

  const goNext = useCallback(() => {
    if (current < total - 1) setCurrent((c) => c + 1)
    else onClose()
  }, [current, total, onClose])

  const goPrev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1)
  }, [current])

  // ── Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    swipedRef.current = false
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    }
    // Segurar para pausar (inicia após 150ms)
    const t = setTimeout(() => setPaused(true), 150)
    ;(e.currentTarget as HTMLElement).dataset.holdTimer = String(t)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Cancela o hold timer
    const t = Number((e.currentTarget as HTMLElement).dataset.holdTimer)
    if (t) clearTimeout(t)
    setPaused(false)

    const touch = touchStartRef.current
    if (!touch) return

    const dx = e.changedTouches[0].clientX - touch.x
    const dy = e.changedTouches[0].clientY - touch.y
    const dt = Date.now() - touch.time

    // Swipe horizontal para fechar (≥80px horizontal, < vertical)
    if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      swipedRef.current = true
      onClose()
      return
    }

    // Tap rápido (< 300ms, < 10px de movimento)
    if (dt < 300 && Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      swipedRef.current = true
      if (touch.x < window.innerWidth / 2) goPrev()
      else goNext()
    }
  }

  // Impede que o scroll da página passe pelo stories
  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation()
  }

  // Pré-carrega todas as imagens do álbum ao abrir
  useEffect(() => {
    album.stories.forEach(s => {
      const img = new Image()
      img.src = s.imagem
    })
  }, [album.stories])

  const story = album.stories[current]

  return (
    <motion.div
      className="stories-container fixed inset-0 z-50 bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      // Impede que eventos de toque cheguem ao que está atrás
      style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* ── Imagem ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <img
            src={story.imagem}
            alt=""
            className="w-full h-full object-cover"
            draggable={false}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 65%, rgba(0,0,0,0.65) 100%)',
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Barras de progresso ── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 px-3 pt-3">
        {album.stories.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-0.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.3)' }}
          >
            <motion.div
              className="h-full rounded-full bg-white"
              style={{
                width: i < current ? '100%' : i === current ? `${progress}%` : '0%',
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Header ── */}
      <div className="absolute top-5 left-0 right-0 z-10 flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <img src={album.capa} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-semibold text-sm">{album.titulo}</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-white/70 text-lg"
        >
          ✕
        </motion.button>
      </div>

      {/* ── Indicador de pause ── */}
      <AnimatePresence>
        {paused && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Legenda ── */}
      <AnimatePresence mode="wait">
        {story.legenda && (
          <motion.div
            key={current + '-cap'}
            className="absolute bottom-8 left-0 right-0 z-10 px-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <p className="text-white text-base font-semibold text-center leading-snug">
              {story.legenda}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
