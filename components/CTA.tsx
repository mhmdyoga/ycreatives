'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const button = buttonRef.current

    if (!title || !subtitle || !button) return

    gsap.set([title, subtitle, button], { opacity: 0, y: 30 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
        end: 'top 30%',
        toggleActions: 'play none none none',
        markers: false,
      },
    })

    tl.to(title, { opacity: 1, y: 0, duration: 0.6 }, 0)
    tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
    tl.to(button, { opacity: 1, y: 0, duration: 0.6 }, 0.2)

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="contact"
      className="py-24 px-6 bg-black text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Tagline */}
        <p className="text-sm uppercase tracking-widest text-accent font-body mb-6">
          Ready to Start?
        </p>

        {/* Title */}
        <h2
          ref={titleRef}
          className="font-heading font-bold text-white mb-6"
        >
          Let&apos;s Create Something
          <br />
          <span className="text-accent">Extraordinary</span>
        </h2>

        {/* Description */}
        <p
          ref={subtitleRef}
          className="font-body text-lg text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Whether you have a project in mind or just want to explore
          possibilities, we&apos;re here to help bring your vision to life.
        </p>

        {/* CTA Button */}
        <button
          ref={buttonRef}
          className="px-10 py-4 bg-white text-black font-body rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 font-semibold"
        >
          Get in Touch
        </button>

        {/* Contact Info */}
        <div className="mt-16 pt-12 border-t border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-body mb-2">
              Email
            </p>
            <a
              href="mailto:hello@ycreatives.com"
              className="text-white hover:text-accent transition-colors"
            >
              hello@ycreatives.com
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-body mb-2">
              Phone
            </p>
            <a
              href="tel:+1234567890"
              className="text-white hover:text-accent transition-colors"
            >
              +1 (234) 567-890
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-400 font-body mb-2">
              Location
            </p>
            <p className="text-white">San Francisco, CA</p>
          </div>
        </div>
      </div>
    </section>
  )
}
