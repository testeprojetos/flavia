import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AnimatedBackground } from '../components/AnimatedBackground'
import { MusicPlayer } from '../components/MusicPlayer'
import { CoupleCard } from '../components/CoupleCard'
import { MessageCard } from '../components/MessageCard'
import { AlbunsSection } from '../components/AlbunsSection'
import { ConquistasSection } from '../components/ConquistasSection'
import { RetrospectCard } from '../components/RetrospectCard'
import { WrappedScreen } from './WrappedScreen'
import { PlayerProvider } from '../context/PlayerContext'
import type { AppData } from '../types'

interface Props {
  data: AppData
}

export function Dashboard({ data }: Props) {
  const [wrappedOpen, setWrappedOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fade-in do container via CSS puro
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.style.opacity = '0'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.5s ease'
      el.style.opacity = '1'
    })
  }, [])

  // Esconde o indicador de scroll após o primeiro scroll ou após 4s
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onScroll = () => { if (el.scrollTop > 30) setScrolled(true) }
    el.addEventListener('scroll', onScroll, { passive: true })
    const timer = setTimeout(() => setScrolled(true), 4000)
    return () => { el.removeEventListener('scroll', onScroll); clearTimeout(timer) }
  }, [])

  return (
    <PlayerProvider arquivo={data.musicaPrincipal.arquivo} fotosLength={data.musicaPrincipal.fotos.length}>
    <>
      <AnimatedBackground />

      <div
        ref={containerRef}
        className="relative z-10"
        style={{
          minHeight: '100dvh',
          overflowY: 'scroll',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch' as never,
          overscrollBehavior: 'none',
        }}
      >
        <MusicPlayer
          titulo={data.musicaPrincipal.titulo}
          artista={data.musicaPrincipal.artista}
          fotos={data.musicaPrincipal.fotos}
        />

        <CoupleCard
          foto={data.casal.fotoPrincipal}
          inicioRelacionamento={data.casal.inicioRelacionamento}
        />

        <MessageCard
          mensagem={data.casal.mensagemEspecial}
          nome1={data.casal.nome1}
          nome2={data.casal.nome2}
          musicaTitulo={data.musicaPrincipal.titulo}
          musicaArtista={data.musicaPrincipal.artista}
        />

        <AlbunsSection
          albuns={data.albuns}
          nome1={data.casal.nome1}
          nome2={data.casal.nome2}
        />

        <ConquistasSection conquistas={data.conquistas} />

        <RetrospectCard
          onOpen={() => setWrappedOpen(true)}
        />
      </div>

      {/* Indicador de scroll — some após o primeiro scroll */}
      <AnimatePresence>
        {!scrolled && !wrappedOpen && (
          <motion.div
            className="fixed bottom-6 left-0 right-0 z-10 flex flex-col items-center gap-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-white/40 text-xs tracking-wide">role para baixo</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wrappedOpen && (
          <WrappedScreen data={data} onClose={() => setWrappedOpen(false)} />
        )}
      </AnimatePresence>
    </>
    </PlayerProvider>
  )
}
