'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  category: string
  description: string
  color: string
}

const projects: Project[] = [
  {
    title: 'Digital Transformation',
    category: 'E-Commerce',
    description: 'Complete redesign and rebuild for a leading luxury brand',
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Brand Evolution',
    category: 'Branding',
    description: 'Comprehensive brand identity for a tech startup',
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Web Experience',
    category: 'Web Design',
    description: 'Interactive storytelling platform for creative agency',
    color: 'from-pink-500 to-pink-600',
  },
  {
    title: 'Mobile First',
    category: 'Development',
    description: 'Cross-platform mobile application with real-time features',
    color: 'from-green-500 to-green-600',
  },
  {
    title: '3D Showcase',
    category: '3D Animation',
    description: 'Interactive product visualization and configurator',
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    title: 'Data Dashboard',
    category: 'Web Application',
    description: 'Advanced analytics platform for enterprise clients',
    color: 'from-indigo-500 to-indigo-600',
  },
]

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const projects = projectsRef.current.filter(Boolean)

    projects.forEach((project, index) => {
      gsap.set(project, { opacity: 0, y: 40 })

      gsap.to(project, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: (index % 2) * 0.15,
        scrollTrigger: {
          trigger: project,
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none none',
          markers: false,
        },
      })
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={containerRef} id="work" className="py-24 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-20">
          <h2 className="font-heading font-bold text-black mb-4">
            Featured Work
          </h2>
          <p className="font-body text-secondary max-w-2xl">
            A selection of projects that showcase our expertise and creativity
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) projectsRef.current[index] = el
              }}
              className="group cursor-pointer rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              {/* Image Placeholder */}
              <div
                className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-5xl opacity-30">▲</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-accent font-body mb-2">
                  {project.category}
                </p>
                <h3 className="font-heading font-bold text-black mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="font-body text-secondary text-sm mb-4">
                  {project.description}
                </p>
                <div className="inline-flex items-center gap-2 text-accent text-sm font-body opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all">
                  View Project
                  <svg
                    className="w-4 h-4"
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
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-black text-white font-body rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  )
}
