import { motion } from 'framer-motion'
import { useCounter } from '../hooks/useCounter'

interface Props {
  foto: string
  inicioRelacionamento: string
}

const UNITS = [
  { key: 'anos',    label: 'Anos' },
  { key: 'meses',   label: 'Meses' },
  { key: 'dias',    label: 'Dias' },
  { key: 'horas',   label: 'Horas' },
  { key: 'minutos', label: 'Minutos' },
  { key: 'segundos',label: 'Segundos' },
] as const

export function CoupleCard({ foto, inicioRelacionamento }: Props) {
  const elapsed = useCounter(inicioRelacionamento)

  const values: Record<string, number> = {
    anos:     elapsed.anos,
    meses:    elapsed.meses,
    dias:     elapsed.dias,
    horas:    elapsed.horas,
    minutos:  elapsed.minutos,
    segundos: elapsed.segundos,
  }

  return (
    <div
      className="mx-4 mb-4 rounded-3xl overflow-hidden relative z-10"
      style={{
        marginTop: '-28px',
        background: '#D4C4A8',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.35), 0 8px 32px rgba(0,0,0,0.4)',
      }}
    >
      {/* ── Foto com label ── */}
      <div className="relative w-full" style={{ aspectRatio: '3/2' }}>
        <img
          src={foto}
          alt="Foto do casal"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(15,25,45,0.75) 100%)',
          }}
        />
        {/* label "Sobre o casal" canto superior esquerdo */}
        <div className="absolute top-4 left-4">
          <span className="font-bold text-base" style={{ color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>Sobre o casal</span>
        </div>
      </div>

      {/* ── Divisor ── */}
      <div className="mx-5 h-px mt-1" style={{ background: 'rgba(0,0,0,0.1)' }} />

      {/* ── Grid de contagem ── */}
      <div className="grid grid-cols-3 px-4 py-4 gap-y-4">
        {UNITS.map((u) => (
          <div key={u.key} className="flex flex-col items-center">
            <motion.span
              key={values[u.key]}
              className="font-black leading-none"
              style={{ fontSize: 32, color: '#1a1a1a' }}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.15 }}
            >
              {values[u.key]}
            </motion.span>
            <span
              className="text-sm mt-1"
              style={{ color: 'rgba(0,0,0,0.45)' }}
            >
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
