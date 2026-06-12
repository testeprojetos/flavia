import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Stories } from './Stories'
import { useFadeInView } from '../hooks/useFadeInView'
import type { Album } from '../types'

interface Props {
  albuns: Album[]
  nome1: string
  nome2: string
}

export function AlbunsSection({ albuns, nome1, nome2 }: Props) {
  const [activeAlbum, setActiveAlbum] = useState<Album | null>(null)
  const ref = useFadeInView()

  return (
    <>
      <div
        ref={ref}
        className="mx-4 mb-4 rounded-3xl overflow-hidden"
        style={{
          background: '#1c2333',
          border: '1px solid rgba(56,189,248,0.1)',
        }}
      >
        <div className="p-5">
          <h3 className="text-white font-black text-xl mb-4">
            Conheça {nome1} e {nome2}
          </h3>

          {/* Grid 3 colunas */}
          <div className="grid grid-cols-3 gap-2">
            {albuns.map((album) => (
              <motion.button
                key={album.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveAlbum(album)}
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: '3/4' }}
              >
                {/* Foto de capa */}
                <img
                  src={album.capa}
                  alt={album.titulo}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Overlay gradiente no rodapé */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.75) 100%)',
                  }}
                />

                {/* Título sobreposto */}
                <div className="absolute bottom-0 left-0 right-0 p-2">
                  <p className="text-white font-bold text-xs leading-tight">
                    {album.titulo}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeAlbum && (
          <Stories album={activeAlbum} onClose={() => setActiveAlbum(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
