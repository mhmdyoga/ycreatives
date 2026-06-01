'use client'

import { useEffect, useRef } from 'react'

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    // Optional: Add any footer animations here
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading font-bold text-white mb-4 text-lg">
              YCreatives
            </h3>
            <p className="font-body text-gray-400 text-sm">
              Crafting digital experiences that captivate and inspire.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Services
            </p>
            <ul className="space-y-2">
              {['Web Design', 'Development', 'Branding', '3D & Animation'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-gray-400 text-sm hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Company
            </p>
            <ul className="space-y-2">
              {['About', 'Work', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-body text-gray-400 text-sm hover:text-accent transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-heading font-bold text-white mb-4 text-sm uppercase tracking-widest">
              Follow
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent hover:text-black transition-all duration-300"
                  aria-label={social}
                >
                  <span className="text-xs font-body">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-body text-gray-400 text-sm">
              © {currentYear} YCreatives. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="font-body text-gray-400 text-sm hover:text-accent transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-gray-400 text-sm hover:text-accent transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
