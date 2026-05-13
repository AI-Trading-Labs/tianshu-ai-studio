'use client'

import { useEffect, useRef } from 'react'

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = []

    // Generate 80 stars
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        opacity: Math.random(),
        speed: Math.random() * 0.02 + 0.005,
      })
    }

    let animationId: number

    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.opacity += star.speed
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.speed = -star.speed
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    function handleResize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      stars.forEach((star) => {
        star.x = Math.random() * canvas.width
        star.y = Math.random() * canvas.height
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: '#080c18' }}
    />
  )
}
