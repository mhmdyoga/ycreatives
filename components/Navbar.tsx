'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const onScroll = () => {
      if (window.scrollY > 50) {
        gsap.to(nav, {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          duration: 0.4,
        })
      } else {
        gsap.to(nav, {
          backdropFilter: 'blur(0px)',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          duration: 0.4,
        })
      }
    }

    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-heading font-bold text-2xl tracking-tighter hover:opacity-70 transition-opacity"
        >
          YCreatives
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 items-center">
          <button
            onClick={() => scrollToSection('services')}
            className="text-sm font-body hover:text-accent transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection('work')}
            className="text-sm font-body hover:text-accent transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-sm font-body hover:text-accent transition-colors"
          >
            Process
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="px-6 py-2 bg-black text-white text-sm font-body rounded-full hover:bg-opacity-80 transition-all"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  )
}
