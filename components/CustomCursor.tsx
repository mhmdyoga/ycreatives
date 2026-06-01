'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let ringX = 0
    let ringY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onMouseEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const onMouseLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const animate = () => {
      // Smooth easing for dot
      dotX += (mouseX - dotX) * 0.3
      dotY += (mouseY - dotY) * 0.3

      // Smoother easing for ring
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15

      dot.style.left = dotX + 'px'
      dot.style.top = dotY + 'px'

      ring.style.left = ringX + 'px'
      ring.style.top = ringY + 'px'

      requestAnimationFrame(animate)
    }

    // Interactive elements that grow the cursor
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]')
    
    const onInteractiveEnter = () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1.5)'
      dot.style.transform = 'translate(-50%, -50%) scale(0.5)'
    }

    const onInteractiveLeave = () => {
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
    }

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onInteractiveEnter)
      el.addEventListener('mouseleave', onInteractiveLeave)
    })

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    animate()

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onInteractiveEnter)
        el.removeEventListener('mouseleave', onInteractiveLeave)
      })
    }
  }, [])

  return (
    <>
      <style jsx>{`
        .custom-cursor-dot {
          position: fixed;
          width: 8px;
          height: 8px;
          background: #1a1a1a;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
        }

        .custom-cursor-ring {
          position: fixed;
          width: 32px;
          height: 32px;
          border: 2px solid #1a1a1a;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          opacity: 0;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease, transform 0.3s ease;
        }
      `}</style>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  )
}
