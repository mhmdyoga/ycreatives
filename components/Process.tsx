'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ProcessStep {
  number: string
  title: string
  description: string
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We dive deep into understanding your brand, goals, and target audience.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Developing a comprehensive strategy that aligns with your business objectives.',
  },
  {
    number: '03',
    title: 'Design',
    description:
      'Crafting beautiful, user-centric designs that engage and inspire.',
  },
  {
    number: '04',
    title: 'Development',
    description:
      'Building robust, scalable solutions using cutting-edge technologies.',
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Deploying your project with precision and celebrating success.',
  },
  {
    number: '06',
    title: 'Support',
    description:
      'Providing ongoing maintenance and optimization for continued growth.',
  },
]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const steps = stepsRef.current.filter(Boolean)
    const line = lineRef.current

    // Animate steps in
    steps.forEach((step, index) => {
      gsap.set(step, { opacity: 0, x: index % 2 === 0 ? -40 : 40 })

      gsap.to(step, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: index * 0.1,
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          end: 'top 20%',
          toggleActions: 'play none none none',
          markers: false,
        },
      })
    })

    // Animate timeline line
    if (line) {
      gsap.set(line, { scaleY: 0, transformOrigin: 'top' })
      gsap.to(line, {
        scaleY: 1,
        duration: 1.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 40%',
          end: 'bottom 40%',
          scrub: 1,
          markers: false,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="process"
      className="py-24 px-6 bg-white"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-20 text-center">
          <h2 className="font-heading font-bold text-black mb-4">
            Our Process
          </h2>
          <p className="font-body text-secondary max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-black transform -translate-x-1/2"
            style={{ height: '100%' }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) stepsRef.current[index] = el
                }}
                className={`flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}
              >
                {/* Content */}
                <div className="w-full md:w-5/12">
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <p className="text-sm uppercase tracking-widest text-accent font-body mb-2">
                      Step {step.number}
                    </p>
                    <h3 className="font-heading font-bold text-black mb-3 text-xl">
                      {step.title}
                    </h3>
                    <p className="font-body text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="w-2/12 flex justify-center">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center z-10 relative">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                      <span className="font-heading font-bold text-sm text-black">
                        {parseInt(step.number)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Placeholder for right side */}
                <div className="w-5/12 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
