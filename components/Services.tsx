'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  title: string
  description: string
  icon: string
}

const services: Service[] = [
  {
    title: 'Web Design',
    description:
      'Beautiful, intuitive web experiences that engage users and drive conversions.',
    icon: '🎨',
  },
  {
    title: 'Development',
    description:
      'Robust, scalable solutions built with modern technologies and best practices.',
    icon: '⚙️',
  },
  {
    title: 'Branding',
    description:
      'Distinctive brand identities that tell your story and resonate with audiences.',
    icon: '✨',
  },
  {
    title: '3D & Animation',
    description:
      'Immersive visual experiences that bring products and ideas to life.',
    icon: '🎬',
  },
]

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean)

    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 30 })

      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
          markers: false,
        },
      })
    })

    // 3D Tilt effect on hover
    cards.forEach((card) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) * 0.05
        const rotateY = (centerX - x) * 0.05

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          overwrite: 'auto',
        })
      }

      const onMouseLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.3,
        })
      }

      card.addEventListener('mousemove', onMouseMove)
      card.addEventListener('mouseleave', onMouseLeave)

      return () => {
        card.removeEventListener('mousemove', onMouseMove)
        card.removeEventListener('mouseleave', onMouseLeave)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="services"
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20 text-center">
          <h2 className="font-heading font-bold text-black mb-4">
            Our Services
          </h2>
          <p className="font-body text-secondary max-w-2xl mx-auto">
            Comprehensive solutions tailored to elevate your digital presence
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group p-8 bg-white border border-border rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="font-heading font-bold text-black mb-3 text-lg group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="font-body text-secondary leading-relaxed">
                {service.description}
              </p>

              {/* Arrow */}
              <div className="mt-6 inline-block text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-6 h-6 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
