import CustomCursor from '@/components/CustomCursor'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Work from '@/components/Work'
import Process from '@/components/Process'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <Process />
      <CTA />
      <Footer />
    </main>
  )
}
