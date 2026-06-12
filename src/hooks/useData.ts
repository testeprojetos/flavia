import { useState, useEffect } from 'react'
import type { AppData } from '../types'

// Garante que o caminho de mídia sempre inclui o base URL do Vite,
// necessário quando a app é publicada em sub-caminho (ex: GitHub Pages /xoxo/).
const base = import.meta.env.BASE_URL.replace(/\/$/, '') // remove trailing slash

function resolvePath(path: string): string {
  if (!path) return path
  // Se já é URL absoluta (http/https/data), não mexe
  if (/^(https?:|data:)/.test(path)) return path
  // Remove barra inicial para construir caminho relativo ao base
  const relative = path.replace(/^\//, '')
  return `${base}/${relative}`
}

function resolvePaths(json: AppData): AppData {
  return {
    ...json,
    casal: {
      ...json.casal,
      fotoPrincipal: resolvePath(json.casal.fotoPrincipal),
    },
    musicaPrincipal: {
      ...json.musicaPrincipal,
      arquivo: resolvePath(json.musicaPrincipal.arquivo),
      fotos: json.musicaPrincipal.fotos.map(resolvePath),
    },
    albuns: json.albuns.map((album) => ({
      ...album,
      capa: resolvePath(album.capa),
      musica: resolvePath(album.musica),
      stories: album.stories.map((s) => ({
        ...s,
        imagem: resolvePath(s.imagem),
      })),
    })),
    conquistas: json.conquistas.map((c) => ({
      ...c,
      imagem: resolvePath(c.imagem),
    })),
    wrapped: {
      ...json.wrapped,
      musica: {
        ...json.wrapped.musica,
        imagem: resolvePath(json.wrapped.musica.imagem),
      },
      destinoFavorito: {
        ...json.wrapped.destinoFavorito,
        imagem: resolvePath(json.wrapped.destinoFavorito.imagem),
      },
      momentoEspecial: {
        ...json.wrapped.momentoEspecial,
        imagem: resolvePath(json.wrapped.momentoEspecial.imagem),
      },
      melhoresFotos: json.wrapped.melhoresFotos.map(resolvePath),
    },
  }
}

export function useData() {
  const [data, setData] = useState<AppData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${base}/data/dados.json`)
      .then((r) => r.json())
      .then((json: AppData) => {
        setData(resolvePaths(json))
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { data, loading, error }
}
