export interface Story {
  imagem: string
  legenda?: string
}

export interface Album {
  id: string
  titulo: string
  capa: string
  musica: string
  stories: Story[]
}

export interface Conquista {
  id: string
  nivel: 'lendario' | 'epico' | 'raro' | 'comum'
  icone: string
  titulo: string
  descricao: string
  desbloqueada: boolean
  progresso: number
  imagem: string
  fotoPosition?: string
}

export interface WrappedNumeros {
  encontros: number
  viagens: number
  fotos: number
  presentes: number
}

export interface WrappedTop5 {
  posicao: number
  descricao: string
  emoji: string
}

export interface TimelineItem {
  data: string
  evento: string
}

export interface AppData {
  casal: {
    nome1: string
    nome2: string
    inicioRelacionamento: string
    fotoPrincipal: string
    mensagemEspecial: string
  }
  musicaPrincipal: {
    titulo: string
    artista: string
    arquivo: string
    fotos: string[]
  }
  albuns: Album[]
  conquistas: Conquista[]
  wrapped: {
    musica: { titulo: string; artista: string; imagem: string }
    destinoFavorito: { nome: string; imagem: string }
    momentoEspecial: { descricao: string; imagem: string }
    numeros: WrappedNumeros
    top5: WrappedTop5[]
    timeline: TimelineItem[]
    melhoresFotos: string[]
  }
}
