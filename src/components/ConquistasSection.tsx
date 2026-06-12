import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFadeInView } from '../hooks/useFadeInView'
import type { Conquista } from '../types'

// ── Paleta por nível ──────────────────────────────────────────────────────
const NIVEL_STYLE = {
  lendario: {
    border: '#f59e0b',
    glow: 'rgba(245,158,11,0.5)',
    color: '#f59e0b',
    label: 'LENDÁRIO',
    bg: 'rgba(245,158,11,0.08)',
  },
  epico: {
    border: '#a855f7',
    glow: 'rgba(168,85,247,0.45)',
    color: '#a855f7',
    label: 'ÉPICO',
    bg: 'rgba(168,85,247,0.08)',
  },
  raro: {
    border: '#3b82f6',
    glow: 'rgba(59,130,246,0.4)',
    color: '#3b82f6',
    label: 'RARO',
    bg: 'rgba(59,130,246,0.08)',
  },
  comum: {
    border: '#6b7280',
    glow: 'rgba(107,114,128,0.3)',
    color: '#9ca3af',
    label: 'COMUM',
    bg: 'rgba(107,114,128,0.07)',
  },
}

// ── Ícones SVG por nome ────────────────────────────────────────────────────
function Icon({ name, size = 28, color }: { name: string; size?: number; color: string }) {
  const s = { width: size, height: size, fill: 'none', stroke: color, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'trophy':    return <svg viewBox="0 0 24 24" style={s}><path d="M6 9H4a1 1 0 0 1-1-1V5h3m12 4h2a1 1 0 0 0 1-1V5h-3M6 9a6 6 0 0 0 12 0M6 9V5h12v4"/><path d="M12 15v4m-4 2h8"/></svg>
    case 'star':      return <svg viewBox="0 0 24 24" style={s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'infinite':  return <svg viewBox="0 0 24 24" style={s}><path d="M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z"/></svg>
    case 'flame':     return <svg viewBox="0 0 24 24" style={s}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
    case 'diamond':   return <svg viewBox="0 0 24 24" style={s}><path d="m2 12 10 10 10-10L12 2 2 12z"/><path d="m2 12 5-7h10l5 7"/><path d="M7 5l5 7 5-7"/></svg>
    case 'compass':   return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
    case 'shield':    return <svg viewBox="0 0 24 24" style={s}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'moon':      return <svg viewBox="0 0 24 24" style={s}><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
    case 'camera':    return <svg viewBox="0 0 24 24" style={s}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
    case 'heart':     return <svg viewBox="0 0 24 24" style={s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    case 'gift':      return <svg viewBox="0 0 24 24" style={s}><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
    case 'target':    return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
    case 'sparkles':  return <svg viewBox="0 0 24 24" style={s}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
    case 'sun':       return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    case 'smile':     return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10"/><path d="M8 13s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
    case 'music':     return <svg viewBox="0 0 24 24" style={s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    case 'image':     return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    case 'zap':       return <svg viewBox="0 0 24 24" style={s}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    case 'award':     return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>
    case 'book':      return <svg viewBox="0 0 24 24" style={s}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
    case 'crown':     return <svg viewBox="0 0 24 24" style={s}><path d="M2 19h20M2 19l3-9 5 4 2-7 2 7 5-4 3 9"/></svg>
    case 'lock':      return <svg viewBox="0 0 24 24" style={s}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    default:          return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="10"/></svg>
  }
}

// ── Card pequeno na grade ─────────────────────────────────────────────────
function ConquistaCard({ conquista, onClick }: { conquista: Conquista; onClick: () => void }) {
  const style = NIVEL_STYLE[conquista.nivel]

  if (!conquista.desbloqueada) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-end pb-2"
        style={{
          aspectRatio: '1/1.1',
          background: '#181e2e',
          border: `1px solid rgba(255,255,255,0.08)`,
        }}
      >
        {/* grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon name="lock" size={24} color="rgba(255,255,255,0.2)" />
        </div>
        <span className="relative text-white/20 text-[9px] font-bold">???</span>
      </motion.button>
    )
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-1.5 p-2"
      style={{
        aspectRatio: '1/1.1',
        background: style.bg,
        border: `1.5px solid ${style.border}`,
        boxShadow: `0 0 12px ${style.glow}`,
      }}
    >
      {/* grid pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
      <div className="relative">
        <Icon name={conquista.icone} size={26} color={style.color} />
      </div>
      <span className="relative text-[9px] font-bold text-center leading-tight" style={{ color: style.color }}>
        {conquista.titulo}
      </span>
    </motion.button>
  )
}

// ── Modal com flip ─────────────────────────────────────────────────────────
function ConquistaModal({ conquista, onClose }: { conquista: Conquista; onClose: () => void }) {
  // Auto-flip após montar
  const [flipped, setFlipped] = useState(false)
  const style = NIVEL_STYLE[conquista.nivel]

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 500)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
    >
      {/* Badge status */}
      <div className="mb-4 px-4 py-1.5 rounded-full border text-xs font-black tracking-widest"
        style={conquista.desbloqueada
          ? { background: 'rgba(245,158,11,0.15)', border: '1px solid #f59e0b', color: '#f59e0b' }
          : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)' }
        }>
        {conquista.desbloqueada ? 'DESBLOQUEADA' : 'BLOQUEADA'}
      </div>

      {/* Card com flip */}
      <div
        className="relative w-72"
        style={{ height: 340, perspective: '1000px' }}
        onClick={(e) => {
          e.stopPropagation()
          if (conquista.desbloqueada) setFlipped((f) => !f)
        }}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── VERSO (frente antes do flip) ── */}
          <div
            className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center gap-4 overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              background: '#181e2e',
              border: `2px solid ${style.border}`,
              boxShadow: `0 0 30px ${style.glow}, 0 0 60px ${style.glow}`,
            }}
          >
            {/* grid pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
            <div className="relative">
              <Icon name={conquista.icone} size={56} color={style.color} />
            </div>
            <div className="flex gap-1">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: style.color, opacity: i < 3 ? 1 : 0.3 }} />
              ))}
            </div>
            {conquista.desbloqueada && (
              <p className="relative text-white/40 text-xs">Toque para virar o card</p>
            )}
          </div>

          {/* ── FRENTE (após flip) ── */}
          <div
            className="absolute inset-0 rounded-3xl overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              border: `2px solid ${style.border}`,
              boxShadow: `0 0 30px ${style.glow}`,
              background: '#181e2e',
            }}
          >
            {conquista.desbloqueada ? (
              <>
                {/* Foto */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={conquista.imagem}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ objectPosition: conquista.fotoPosition ?? 'center' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(12,18,32,1) 100%)' }} />
                </div>
                {/* Info */}
                <div className="px-4 pt-2 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name={conquista.icone} size={18} color={style.color} />
                    <span className="text-white font-black text-base">{conquista.titulo}</span>
                  </div>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{conquista.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black tracking-widest" style={{ color: style.color }}>{style.label}</span>
                    <div className="flex gap-1">
                      {[0,1,2,3].map(i => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: style.color, opacity: i < 3 ? 1 : 0.3 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Bloqueada — frente mostra cadeado + progresso
              <div className="flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center">
                  <Icon name="lock" size={48} color="rgba(255,255,255,0.15)" />
                </div>
                <div className="px-4 pb-5">
                  <p className="text-white font-bold text-base mb-1">{conquista.titulo}</p>
                  <p className="text-white/40 text-xs mb-3">{conquista.descricao}</p>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white/40 text-[10px]">Progresso</span>
                    <span className="text-[10px] font-bold" style={{ color: style.color }}>{conquista.progresso}%</span>
                  </div>
                  <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-full rounded-full" style={{ width: `${conquista.progresso}%`, background: style.color }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <p className="mt-5 text-white/25 text-xs">Toque fora para fechar</p>
    </motion.div>
  )
}

// ── Tela completa ──────────────────────────────────────────────────────────
function ConquistasTela({ conquistas, onClose }: { conquistas: Conquista[]; onClose: () => void }) {
  const [selected, setSelected] = useState<Conquista | null>(null)

  const desbloqueadas = conquistas.filter(c => c.desbloqueada)
  const bloqueadas = conquistas.filter(c => !c.desbloqueada)
  const pct = Math.round((desbloqueadas.length / conquistas.length) * 100)

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col"
      style={{ background: '#080808', overflowY: 'auto', WebkitOverflowScrolling: 'touch' as never }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-12 pb-4 flex-shrink-0">
        <motion.button whileTap={{ scale: 0.9 }} onClick={onClose} className="text-white/60 p-1">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.button>
        <h2 className="text-white font-black text-lg">Conquistas</h2>
        <div className="w-8" />
      </div>

      {/* Progress */}
      <div className="px-5 mb-6">
        <div className="flex justify-between mb-1.5">
          <span className="text-white/60 text-sm">{desbloqueadas.length}/{conquistas.length}</span>
          <span className="text-white font-bold text-sm">{pct}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ background: 'linear-gradient(90deg, #f59e0b, #a855f7)' }}
          />
        </div>
      </div>

      {/* Desbloqueadas */}
      <div className="px-5 mb-6">
        <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
          Desbloqueadas ({desbloqueadas.length})
        </p>
        <div className="grid grid-cols-3 gap-2">
          {desbloqueadas.map(c => (
            <ConquistaCard key={c.id} conquista={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      </div>

      {/* Bloqueadas */}
      <div className="px-5 mb-10">
        <p className="text-white/40 text-xs font-bold tracking-widest uppercase mb-3">
          Bloqueadas ({bloqueadas.length})
        </p>
        <div className="grid grid-cols-3 gap-2">
          {bloqueadas.map(c => (
            <ConquistaCard key={c.id} conquista={c} onClick={() => setSelected(c)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ConquistaModal conquista={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Card no dashboard (scroll horizontal) ────────────────────────────────
interface Props { conquistas: Conquista[] }

export function ConquistasSection({ conquistas }: Props) {
  const [telaAberta, setTelaAberta] = useState(false)
  const ref = useFadeInView()

  const desbloqueadas = conquistas.filter(c => c.desbloqueada)
  const total = conquistas.length

  return (
    <>
      <div ref={ref} className="mx-4 mb-4 rounded-3xl overflow-hidden"
        style={{ background: '#1c2333', border: '1px solid rgba(56,189,248,0.1)' }}>
        <div className="p-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-black text-xl">Conquistas</h3>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setTelaAberta(true)}
              className="rounded-full px-3 py-1.5 text-xs font-bold text-white"
              style={{ background: 'rgba(255,255,255,0.08)' }}>
              {desbloqueadas.length}/{total}
            </motion.button>
          </div>

          {/* Scroll horizontal dos primeiros cards */}
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {conquistas.filter(c => c.desbloqueada).slice(0, 6).map(c => {
              const s = NIVEL_STYLE[c.nivel]
              return (
                <motion.button key={c.id} whileTap={{ scale: 0.92 }}
                  onClick={() => setTelaAberta(true)}
                  className="relative flex-shrink-0 rounded-2xl flex items-center justify-center overflow-hidden"
                  style={{
                    width: 72, height: 80,
                    background: s.bg,
                    border: `1.5px solid ${s.border}`,
                    boxShadow: `0 0 10px ${s.glow}`,
                  }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '8px 8px' }} />
                  <div className="relative">
                    <Icon name={c.icone} size={26} color={s.color} />
                  </div>
                </motion.button>
              )
            })}
            {/* Ver todas */}
            <motion.button whileTap={{ scale: 0.92 }} onClick={() => setTelaAberta(true)}
              className="flex-shrink-0 rounded-2xl flex items-center justify-center"
              style={{ width: 72, height: 80, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <span className="text-white/40 text-[10px] font-bold text-center leading-tight px-1">Ver todas</span>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {telaAberta && (
          <ConquistasTela conquistas={conquistas} onClose={() => setTelaAberta(false)} />
        )}
      </AnimatePresence>
    </>
  )
}
