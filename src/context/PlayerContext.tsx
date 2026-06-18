import { createContext, useContext, useState, useRef, useCallback, useEffect } from 'react'
import { Howl } from 'howler'

interface PlayerState {
  playing: boolean
  progress: number      // 0–100
  currentSec: number
  duration: number
  currentFoto: number
  bgColor: string
}

interface PlayerContextValue extends PlayerState {
  howlRef: React.MutableRefObject<Howl | null>
  rafRef: React.MutableRefObject<number>
  togglePlay: () => void
  seek: (pct: number) => void
  goNext: () => void
  goPrev: () => void
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  setProgress: React.Dispatch<React.SetStateAction<number>>
  setCurrentSec: React.Dispatch<React.SetStateAction<number>>
  setDuration: React.Dispatch<React.SetStateAction<number>>
  setCurrentFoto: React.Dispatch<React.SetStateAction<number>>
  fotosLength: number
  bgColors: string[]
  textColor: string
}

const BG_COLORS = [
  '#1a1208',  // casal1 — âmbar escuro / noite sertaneja
  '#1a0a0e',  // casal2 — vinho escuro (combina com as rosas vermelhas)
  '#1f1005',  // casal3 — marrom dourado / pôr do sol
  '#0f1020',  // casal4 — azul noturno / céu do entardecer
]

const TEXT_COLORS = [
  '#ffffff',  // casal1
  '#ffffff',  // casal2
  '#ffffff',  // casal3
  '#ffffff',  // casal4
]

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function PlayerProvider({
  children,
  arquivo,
  fotosLength,
}: {
  children: React.ReactNode
  arquivo: string
  fotosLength: number
}) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentSec, setCurrentSec] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentFoto, setCurrentFoto] = useState(0)
  const howlRef = useRef<Howl | null>(null)
  const rafRef = useRef<number>(0)

  const bgColor = BG_COLORS[currentFoto % BG_COLORS.length]
  const textColor = TEXT_COLORS[currentFoto % TEXT_COLORS.length]

  useEffect(() => {
    const sound = new Howl({
      src: [arquivo],
      html5: true,
      loop: true,
      onload() {
        setDuration(sound.duration())
        sound.play()
        setPlaying(true)
        rafRef.current = requestAnimationFrame(tick)
      },
    })
    howlRef.current = sound
    return () => { sound.unload(); cancelAnimationFrame(rafRef.current) }
  }, [arquivo])

  const tick = useCallback(() => {
    const h = howlRef.current
    if (!h) return
    const s = h.seek() as number
    setCurrentSec(s)
    setProgress((s / (h.duration() || 1)) * 100)
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const togglePlay = useCallback(() => {
    const h = howlRef.current
    if (!h) return
    if (playing) {
      h.pause(); cancelAnimationFrame(rafRef.current); setPlaying(false)
    } else {
      h.play(); rafRef.current = requestAnimationFrame(tick); setPlaying(true)
    }
  }, [playing, tick])

  const seek = useCallback((pct: number) => {
    const h = howlRef.current
    if (!h) return
    const t = (pct / 100) * (h.duration() || 0)
    h.seek(t); setProgress(pct); setCurrentSec(t)
  }, [])

  const goNext = useCallback(() => setCurrentFoto((c) => (c + 1) % fotosLength), [fotosLength])
  const goPrev = useCallback(() => setCurrentFoto((c) => (c - 1 + fotosLength) % fotosLength), [fotosLength])

  return (
    <PlayerContext.Provider value={{
      playing, progress, currentSec, duration, currentFoto, bgColor: bgColor,
      howlRef, rafRef,
      togglePlay, seek, goNext, goPrev,
      setPlaying, setProgress, setCurrentSec, setDuration, setCurrentFoto,
      fotosLength, bgColors: BG_COLORS, textColor,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
