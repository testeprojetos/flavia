import { motion } from 'framer-motion'

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base: azul-petróleo escuro */}
      <div className="absolute inset-0" style={{ background: '#080808' }} />

      {/* Blob teal superior esquerdo */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Blob índigo direito */}
      <motion.div
        className="absolute top-1/3 -right-24 w-80 h-80 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          filter: 'blur(55px)',
        }}
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Blob ciano inferior */}
      <motion.div
        className="absolute -bottom-24 left-1/4 w-72 h-72 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
        animate={{ x: [0, 35, 0], y: [0, -35, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
      />

      {/* Blob roxo suave centro */}
      <motion.div
        className="absolute top-2/3 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}
