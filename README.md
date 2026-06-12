# Love Story — Presente Digital ❤️

Site mobile-first estilo Spotify Wrapped para o Dia dos Namorados.

## Como personalizar

### 1. Fotos
Substitua os arquivos da pasta `public/fotos/` pelas fotos reais do casal.
Os nomes dos arquivos devem ser mantidos conforme definido em `public/data/dados.json`.

| Arquivo | Onde aparece |
|---|---|
| `casal1.jpg` até `casal4.jpg` | Player principal (troca ao clicar anterior/próximo) |
| `album1_capa.jpg` até `album3_capa.jpg` | Capas dos álbuns |
| `date1-4.jpg` | Stories "Nossos Dates" |
| `ale1-4.jpg` | Stories "Fotos Aleatórias" |
| `viagem1-4.jpg` | Stories "Primeira Viagem" |

### 2. Músicas
Coloque os arquivos `.mp3` em `public/musicas/`:
- `principal.mp3` — toca no player do dashboard
- `dates.mp3` — toca ao abrir o álbum "Nossos Dates"
- `aleatorias.mp3` — toca ao abrir "Fotos Aleatórias"
- `viagem.mp3` — toca ao abrir "Primeira Viagem"

### 3. Dados
Edite `public/data/dados.json` para personalizar nomes, data de início, mensagem, conquistas e wrapped.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build para GitHub Pages

```bash
npm run build
```

O conteúdo da pasta `dist/` deve ser publicado no GitHub Pages.

### Configuração no GitHub Pages
- Vá em **Settings → Pages**
- Source: `Deploy from a branch`
- Branch: `gh-pages` (ou configure via GitHub Actions fazendo deploy da pasta `dist/`)

## Tecnologias

React · Vite · TypeScript · Tailwind CSS · Framer Motion · Howler.js · Radix UI
