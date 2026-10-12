import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Hero from '../components/Hero'
import ProductCatalog from '../components/ProductCatalog'
import FreightCalculator from '../components/FreightCalculator'
import ReeferTracker from '../components/ReeferTracker'
import ColdChainSection from '../components/ColdChainSection'
import SeasonalityMatrix from '../components/SeasonalityMatrix'
import CertificationsSection from '../components/CertificationsSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FaqSection from '../components/FaqSection'
import ContactSection from '../components/ContactSection'

export const Route = createFileRoute('/')({ component: FruitExportApp })

function FruitExportApp() {
  const [catalogSearch, setCatalogSearch] = useState<string>('')

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* 1. Hero Section */}
      <Hero onSearchSubmit={(query) => setCatalogSearch(query)} />

      {/* 2. Interactive Fresh Fruit Catalog */}
      <ProductCatalog
        searchQuery={catalogSearch}
        setSearchQuery={setCatalogSearch}
      />

      {/* 3. FOB & CIF Bulk Export Freight Calculator */}
      <FreightCalculator />

      {/* 4. Live Reefer Container & Fleet IoT Telematics Tracker */}
      <ReeferTracker />

      {/* 5. Cold-Chain Technology & Automated Packhouse Operations */}
      <ColdChainSection />

      {/* 6. Harvest & Export Seasonality Matrix */}
      <SeasonalityMatrix />

      {/* 7. Phytosanitary & Audit Certifications */}
      <CertificationsSection />

      {/* 8. Global Supermarket Importer Testimonials */}
      <TestimonialsSection />

      {/* 9. International Trade FAQs */}
      <FaqSection />

      {/* 10. Direct Export Desk Contact & Port Directory */}
      <ContactSection />
    </main>
  )
}
