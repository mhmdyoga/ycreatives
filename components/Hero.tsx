'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const vignetteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const wordmark = wordmarkRef.current

    if (!container || !title || !subtitle || !wordmark) return

    // Initial animations
    gsap.set([title, subtitle], { opacity: 0, y: 30 })

    const tl = gsap.timeline()
    tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0)
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.2)

    // Wordmark parallax animation
    gsap.to(wordmark, {
      y: -100,
      opacity: 0,
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white"
    >
      {/* Vignette Background */}
      <div
        ref={vignetteRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* 3D Scene Container (Sketchfab Placeholder) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-96 h-96 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Wordmark with parallax */}
        <div
          ref={wordmarkRef}
          className="mb-8 font-heading text-sm tracking-widest uppercase text-secondary"
        >
          Creative Digital Studio
        </div>

        {/* Main Title */}
        <h1
          ref={titleRef}
          className="font-heading font-bold text-black mb-6 leading-tight"
        >
          Crafting Digital
          <br />
          Experiences That
          <br />
          <span className="text-accent">Captivate</span>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-lg text-secondary max-w-2xl mx-auto mb-12"
        >
          We transform ideas into stunning digital solutions through design,
          development, and innovation.
        </p>

        {/* CTA Button */}
        <button className="px-8 py-4 bg-black text-white font-body rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
          Explore Our Work
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <p className="text-xs text-secondary font-body uppercase tracking-widest">
          Scroll
        </p>
        <svg
          className="w-5 h-5 text-secondary animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
