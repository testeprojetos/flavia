import { motion, AnimatePresence } from 'framer-motion'
import { usePlayer } from '../context/PlayerContext'

interface Props {
  titulo: string
  artista: string
  fotos: string[]
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function MusicPlayer({ titulo, artista, fotos }: Props) {
  const { playing, progress, currentSec, duration, currentFoto, bgColor, textColor, togglePlay, seek, goNext, goPrev } = usePlayer()

  const remaining = duration - currentSec
  const isLight = textColor === '#000000'

  // Cores derivadas do textColor para manter hierarquia visual
  const textPrimary   = textColor
  const textSecondary = isLight ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.6)'
  const textMuted     = isLight ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.5)'
  const trackBg       = isLight ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.25)'
  const trackFill     = isLight ? 'rgba(0,0,0,0.75)' : 'white'
  const checkBg       = isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.25)'
  const checkBorder   = isLight ? 'rgba(0,0,0,0.3)'  : 'rgba(255,255,255,0.5)'
  const overlayGrad   = isLight
    ? 'linear-gradient(to bottom, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.12) 100%)'
    : 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.35) 100%)'

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    seek(((e.clientX - rect.left) / rect.width) * 100)
  }

  return (
    <div className="relative overflow-hidden rounded-b-3xl mb-2">
      {/* Fundo com transição de cor */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${currentFoto}`}
          className="absolute inset-0"
          style={{ background: bgColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none" style={{ background: overlayGrad }} />

      <div className="relative z-10 pt-6 pb-12">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 mb-6">
          <motion.button whileTap={{ scale: 0.85 }} className="p-1" style={{ color: textSecondary }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
          <div className="flex flex-col items-center">
            <span className="font-bold text-sm" style={{ color: textPrimary }}>Juntos para sempre</span>
            <span className="text-red-400 text-sm">❤️</span>
          </div>
          <motion.button whileTap={{ scale: 0.85 }} className="p-1" style={{ color: textSecondary }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>
            </svg>
          </motion.button>
        </div>

        {/* Album art */}
        <div className="px-5 mb-6">
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '1/1', boxShadow: '0 20px 56px rgba(0,0,0,0.28)' }}>
            <AnimatePresence mode="sync">
              <motion.img
                key={currentFoto}
                src={fotos[currentFoto]}
                alt="Foto do casal"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              />
            </AnimatePresence>
            {playing && (
              <div className="absolute top-3 right-3 flex items-end gap-[3px]">
                {[0,1,2,3].map((i) => (
                  <motion.div key={i} className="w-[3px] rounded-full bg-white/80"
                    animate={{ height: ['6px','18px','6px'] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay: i*0.14, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Title + check */}
        <div className="flex items-center justify-between px-5 mb-4">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="font-black text-2xl leading-tight truncate" style={{ color: textPrimary }}>{titulo}</h2>
            <p className="text-sm mt-0.5 truncate" style={{ color: textSecondary }}>{artista}</p>
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: checkBg, border: `2px solid ${checkBorder}` }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Progress */}
        <div className="px-5 mb-6">
          <div className="relative w-full h-1 rounded-full cursor-pointer mb-1.5"
            style={{ background: trackBg }} onClick={handleSeek}>
            <div className="absolute left-0 top-0 h-full rounded-full" style={{ width: `${progress}%`, background: trackFill }} />
            <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
              style={{ left: `calc(${progress}% - 6px)`, background: trackFill, boxShadow: '0 0 4px rgba(0,0,0,0.3)' }} />
          </div>
          <div className="flex justify-between">
            <span className="text-[11px] font-medium" style={{ color: textMuted }}>{formatTime(currentSec)}</span>
            <span className="text-[11px] font-medium" style={{ color: textMuted }}>
              {remaining > 0 ? `-${formatTime(remaining)}` : formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-6">
          <button className="p-2" style={{ color: textMuted }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
              <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
            </svg>
          </button>
          <motion.button whileTap={{ scale: 0.85 }} onClick={goPrev} className="p-2" style={{ color: textPrimary }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm2 6 8-6v12z"/>
            </svg>
          </motion.button>
          <motion.button whileTap={{ scale: 0.92 }} onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: textPrimary, boxShadow: '0 6px 24px rgba(0,0,0,0.35)' }}>
            {playing
              ? <svg width="26" height="26" viewBox="0 0 24 24" fill={bgColor}><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
              : <svg width="26" height="26" viewBox="0 0 24 24" fill={bgColor} style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z"/></svg>
            }
          </motion.button>
          <motion.button whileTap={{ scale: 0.85 }} onClick={goNext} className="p-2" style={{ color: textPrimary }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 6h2v12h-2zm-2 6L6 6v12z"/>
            </svg>
          </motion.button>
          <button className="p-2" style={{ color: textMuted }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
