import { useState, useEffect } from 'react'

interface TimeElapsed {
  anos: number
  meses: number
  dias: number
  horas: number
  minutos: number
  segundos: number
  totalDias: number
}

export function useCounter(startDate: string): TimeElapsed {
  const calc = (): TimeElapsed => {
    const start = new Date(startDate)
    const now = new Date()
    const diff = now.getTime() - start.getTime()

    const totalDias = Math.floor(diff / (1000 * 60 * 60 * 24))

    let anos = now.getFullYear() - start.getFullYear()
    let meses = now.getMonth() - start.getMonth()
    let dias = now.getDate() - start.getDate()

    if (dias < 0) {
      meses--
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      dias += prevMonth.getDate()
    }
    if (meses < 0) {
      anos--
      meses += 12
    }

    const horas = now.getHours()
    const minutos = now.getMinutes()
    const segundos = now.getSeconds()

    return { anos, meses, dias, horas, minutos, segundos, totalDias }
  }

  const [elapsed, setElapsed] = useState<TimeElapsed>(calc)

  useEffect(() => {
    const id = setInterval(() => setElapsed(calc()), 1000)
    return () => clearInterval(id)
  }, [startDate])

  return elapsed
}
