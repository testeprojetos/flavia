import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useData } from './hooks/useData'
import { SplashScreen } from './screens/SplashScreen'
import { Dashboard } from './screens/Dashboard'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: '#080808' }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        >
          ❤️
        </div>
        <p className="text-white/30 text-sm">Carregando...</p>
      </div>
    </div>
  )
}

export default function App() {
  const { data, loading, error } = useData()
  const [entered, setEntered] = useState(false)

  if (loading) return <LoadingScreen />

  if (error || !data) {
    return (
      <div className="fixed inset-0 bg-[#080808] flex items-center justify-center p-8 text-center">
        <div>
          <p className="text-white/50 text-sm mb-2">Não foi possível carregar os dados.</p>
          <p className="text-white/25 text-xs">Verifique se o arquivo public/data/dados.json existe.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen" style={{ background: '#080808' }}>
      <AnimatePresence mode="wait">
        {!entered ? (
          <SplashScreen
            key="splash"
            nome1={data.casal.nome1}
            nome2={data.casal.nome2}
            fotoPrincipal={data.casal.fotoPrincipal}
            onEnter={() => setEntered(true)}
          />
        ) : (
          <Dashboard key="dashboard" data={data} />
        )}
      </AnimatePresence>
    </div>
  )
}
