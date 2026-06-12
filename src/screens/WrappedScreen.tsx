import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'
import type { AppData } from '../types'

interface Props {
  data: AppData
  onClose: () => void
}

// ── Slide 1 — Abertura com foto de fundo ──────────────────────────────────
function Slide1({ data }: { data: AppData }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={data.wrapped.musica.imagem} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)' }} />
      <div className="relative h-full flex flex-col items-center justify-end pb-20 px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-white/70 text-sm uppercase tracking-[0.2em] mb-3"
        >
          {data.casal.nome1} & {data.casal.nome2}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="text-4xl font-black text-white leading-tight mb-4"
        >
          Nossa história ❤️
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="w-16 h-0.5 bg-white/50 rounded-full"
        />
      </div>
    </div>
  )
}

// ── Slide 2 — Tempo juntos ────────────────────────────────────────────────
function Slide2({ data }: { data: AppData }) {
  const elapsed = useCounter(data.casal.inicioRelacionamento)
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src="/fotos/casal_capa.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)' }} />
      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-xs uppercase tracking-[0.25em] mb-8"
        >
          Estamos juntos há
        </motion.p>
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 120 }}
          className="mb-6"
        >
          <span className="text-[96px] font-black leading-none text-white">{elapsed.totalDias}</span>
          <p className="text-white/50 text-lg font-light tracking-widest mt-1">dias</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-8"
        >
          {[{ v: elapsed.anos, l: 'anos' }, { v: elapsed.meses, l: 'meses' }, { v: elapsed.dias, l: 'dias restantes' }].map(u => (
            <div key={u.l} className="text-center">
              <span className="text-2xl font-bold text-white block">{u.v}</span>
              <span className="text-white/40 text-xs">{u.l}</span>
            </div>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-white/30 text-sm mt-8"
        >
          e cada um foi escolhido
        </motion.p>
      </div>
    </div>
  )
}

// ── Slide 3 — Nossa música ────────────────────────────────────────────────
function Slide3({ data }: { data: AppData }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src={data.wrapped.musica.imagem} alt="" className="absolute inset-0 w-full h-full object-cover scale-110" style={{ filter: 'blur(18px)' }} />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex flex-col items-center justify-center px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/50 text-xs uppercase tracking-[0.25em] mb-10"
        >
          Nossa música
        </motion.p>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
          className="relative w-52 h-52 rounded-full overflow-hidden mb-8"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
        >
          <img src={data.wrapped.musica.imagem} alt="" className="w-full h-full object-cover" />
          {/* spinning ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{ border: '2px dashed rgba(255,255,255,0.2)' }}
          />
          {/* center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-black/80" />
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white font-black text-2xl mb-1"
        >
          {data.wrapped.musica.titulo}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-white/50 text-base"
        >
          {data.wrapped.musica.artista}
        </motion.p>
      </div>
    </div>
  )
}

// ── Slide 4 — Destino favorito ────────────────────────────────────────────
function Slide4({ data }: { data: AppData }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.img
        src={data.wrapped.destinoFavorito.imagem}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: 'easeOut' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.9) 100%)' }} />
      <div className="relative h-full flex flex-col justify-end px-8 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-xs uppercase tracking-[0.25em] mb-2"
        >
          Nosso destino favorito
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white font-black text-3xl leading-tight"
        >
          {data.wrapped.destinoFavorito.nome}
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5 }}
          className="w-12 h-0.5 bg-white/40 rounded-full mt-4"
        />
      </div>
    </div>
  )
}

// ── Slide 5 — Momento especial ────────────────────────────────────────────
function Slide5({ data }: { data: AppData }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <motion.img
        src={data.wrapped.momentoEspecial.imagem}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: 'easeOut' }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 25%, rgba(0,0,0,0.88) 100%)' }} />
      <div className="relative h-full flex flex-col justify-end px-8 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-xs uppercase tracking-[0.25em] mb-2"
        >
          Momento mais especial
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white font-black text-3xl leading-tight"
        >
          {data.wrapped.momentoEspecial.descricao}
        </motion.h2>
      </div>
    </div>
  )
}

// ── Slide 6 — O que eu mais gosto em você ────────────────────────────────
function Slide6({ data: _data }: { data: AppData }) {
  const items = [
    { emoji: '🤝', titulo: 'Sua lealdade', descricao: 'Você está sempre do meu lado, não importa o que aconteça.' },
    { emoji: '😊', titulo: 'Seu sorriso', descricao: 'Capaz de transformar qualquer dia difícil em algo bom.' },
    { emoji: '🔗', titulo: 'Sua cumplicidade', descricao: 'A sensação de que somos parceiros em tudo.' },
    { emoji: '🌸', titulo: 'Sua leveza', descricao: 'O jeito que você torna tudo mais simples e bonito.' },
  ]
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src="/fotos/casal2.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(20px)', transform: 'scale(1.1)' }} />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative h-full flex flex-col justify-center px-6">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-xs uppercase tracking-[0.25em] mb-8 text-center"
        >
          O que eu mais gosto em você
        </motion.p>
        <div className="flex flex-col gap-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex items-center gap-4 rounded-2xl px-4 py-4"
              style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              <span className="text-3xl">{item.emoji}</span>
              <div className="flex flex-col">
                <span className="text-white font-bold text-base leading-tight">{item.titulo}</span>
                <span className="text-white/50 text-xs mt-0.5 leading-snug">{item.descricao}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Slide 7 — Top 5 ───────────────────────────────────────────────────────
function Slide7({ data }: { data: AppData }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src="/fotos/casal3.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(16px)', transform: 'scale(1.1)' }} />
      <div className="absolute inset-0 bg-black/75" />
      <div className="relative h-full flex flex-col justify-center px-5 py-16">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-xs uppercase tracking-[0.25em] mb-6 text-center"
        >
          Top 5 Momentos
        </motion.p>
        <div className="flex flex-col gap-2.5">
          {data.wrapped.top5.map((item, i) => (
            <motion.div
              key={item.posicao}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 rounded-2xl px-4 py-3"
              style={{
                background: i === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)',
                border: i === 0 ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <span className="text-white/30 font-black text-lg w-5 text-center">{item.posicao}</span>
              <span className="text-xl">{item.emoji}</span>
              <span className="text-white text-sm font-medium flex-1 leading-snug">{item.descricao}</span>
              {i === 0 && <span>🏆</span>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Slide 8 — Linha do tempo ──────────────────────────────────────────────
function Slide8({ data }: { data: AppData }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <img src="/fotos/casal4.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(16px)', transform: 'scale(1.1)' }} />
      <div className="absolute inset-0 bg-black/78" />
      <div className="relative h-full flex flex-col">
        <div className="pt-14 pb-4 px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/60 text-xs uppercase tracking-[0.25em]"
          >
            Nossa linha do tempo
          </motion.p>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <div className="relative">
            <div className="absolute left-3 top-2 bottom-2 w-px bg-white/15" />
            <div className="flex flex-col gap-5 pl-10">
              {data.wrapped.timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  className="relative"
                >
                  <div className="absolute -left-[1.85rem] top-1.5 w-2 h-2 rounded-full bg-white/50" />
                  <span className="text-white/40 text-[11px] uppercase tracking-wider">{item.data}</span>
                  <p className="text-white text-sm mt-0.5 leading-snug">{item.evento}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Slide 9 — Melhores fotos ──────────────────────────────────────────────
function Slide9({ data }: { data: AppData }) {
  const fotos = data.wrapped.melhoresFotos
  return (
    <div className="relative h-full w-full flex flex-col bg-black">
      <div className="pt-14 pb-3 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white/60 text-xs uppercase tracking-[0.25em]"
        >
          Melhores momentos
        </motion.p>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-0.5 px-0.5 pb-0.5">
        {fotos.slice(0, 6).map((foto, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={`relative overflow-hidden ${i === 0 ? 'col-span-2' : ''}`}
            style={{ aspectRatio: i === 0 ? '16/8' : '1/1' }}
          >
            <motion.img
              src={foto}
              alt=""
              className="w-full h-full object-cover"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Slide 10 — Mensagem final (mantido) ───────────────────────────────────
function Slide10({ nome1 }: { nome1: string; nome2?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-8 text-center relative overflow-hidden" style={{ background: '#0a0a0a' }}>
      {['❤️', '💕', '✨', '💖', '🌸', '💫'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none"
          style={{ left: `${10 + i * 15}%`, bottom: '10%' }}
          animate={{ y: [0, -(200 + i * 30)], opacity: [0, 0.8, 0], rotate: [0, i % 2 === 0 ? 15 : -15] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeOut' }}
        >
          {e}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8"
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto"
          style={{ background: 'linear-gradient(135deg, #c2185b, #e91e63)', boxShadow: '0 0 60px rgba(233,30,99,0.5)' }}>
          ❤️
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-white/60 text-base mb-8 leading-relaxed"
      >
        E se pudéssemos viver tudo novamente...
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8, type: 'spring' }}
      >
        <h2 className="text-3xl font-black text-white leading-tight">
          Eu escolheria você{'\n'}todas as vezes ❤️
        </h2>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-white/30 text-sm mt-10"
      >
        Com amor, {nome1}
      </motion.p>
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────

const TOTAL_SLIDES = 10

export function WrappedScreen({ data, onClose }: Props) {
  const [slide, setSlide] = useState(0)
  const [dir, setDir] = useState(1)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const goNext = () => {
    if (slide < TOTAL_SLIDES - 1) { setDir(1); setSlide(s => s + 1) }
    else onClose()
  }
  const goPrev = () => {
    if (slide > 0) { setDir(-1); setSlide(s => s - 1) }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touch = touchStartRef.current
    if (!touch) return
    const dx = e.changedTouches[0].clientX - touch.x
    const dy = e.changedTouches[0].clientY - touch.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) goNext(); else goPrev()
    }
  }

  const slides = [
    <Slide1 data={data} />,
    <Slide2 data={data} />,
    <Slide3 data={data} />,
    <Slide4 data={data} />,
    <Slide5 data={data} />,
    <Slide6 data={data} />,
    <Slide7 data={data} />,
    <Slide8 data={data} />,
    <Slide9 data={data} />,
    <Slide10 nome1={data.casal.nome1} nome2={data.casal.nome2} />,
  ]

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden bg-black"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4 }}
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-4 pt-4">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }}>
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: i <= slide ? '100%' : '0%' }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-8 right-4 z-20 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}
      >
        <span className="text-white/60 text-lg">✕</span>
      </motion.button>

      {/* Slide counter */}
      <div className="absolute top-9 left-4 z-20">
        <span className="text-white/30 text-xs">{slide + 1} / {TOTAL_SLIDES}</span>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={slide}
          className="absolute inset-0"
          custom={dir}
          initial={{ opacity: 0, x: dir * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -50 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          {slides[slide]}
        </motion.div>
      </AnimatePresence>

      {/* Tap zones */}
      <div className="absolute inset-0 z-10 flex pointer-events-none">
        <div className="flex-1 pointer-events-auto" onClick={goPrev} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} />
        <div className="flex-1 pointer-events-auto" onClick={goNext} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} />
      </div>

      {/* Nav hint */}
      {slide === 0 && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-2 z-20 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(255,255,255,0.35)"><path d="m9 18 6-6-6-6" /></svg>
          </motion.div>
          <span className="text-white/30 text-xs">deslize para continuar</span>
        </motion.div>
      )}
    </motion.div>
  )
}
