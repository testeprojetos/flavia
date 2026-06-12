import { useEffect, useRef } from 'react'

/**
 * Fade-in + slide-up via CSS puro ao entrar na viewport.
 * Usa rootMargin para disparar ligeiramente antes do elemento entrar,
 * e checa imediatamente se já está visível no momento do mount.
 */
export function useFadeInView(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.transform = 'translateY(24px)'
    el.style.transition = `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`

    const show = () => {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
      observer.disconnect()
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) show()
      },
      // rootMargin positivo: dispara 80px ANTES do elemento entrar na tela
      { threshold: 0, rootMargin: '0px 0px 80px 0px' }
    )

    observer.observe(el)

    // Dispara imediatamente se o elemento já está visível no mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) show()

    return () => observer.disconnect()
  }, [delay])

  return ref
}
