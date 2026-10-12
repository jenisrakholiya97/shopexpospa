import React from 'react';
import { Star, Quote, Building2, MapPin } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Willem De Groot',
      role: 'Head of Tropical Fruit Procurement',
      company: 'EuroFresh Distribution B.V.',
      location: 'Rotterdam, Netherlands',
      quote: 'Frutex Global has delivered over 180 reefers of Ratnagiri Alphonso Mangoes and Hass Avocados to Port of Rotterdam without a single cold-chain interruption. Their digital data loggers and packaging integrity have cut our store-level wastage by 14%.',
      metric: '180+ Containers Imported in 2025/2026',
      stars: 5
    },
    {
      name: 'Tariq Al-Mansoor',
      role: 'Managing Director Fresh Produce',
      company: 'Gulf Oasis Supermarket Chain',
      location: 'Dubai & Abu Dhabi, UAE',
      quote: 'Our retail customers in UAE demand exceptionally high sweetness in pomegranate arils and seedless limes. Frutex Global consistently delivers Grade A fruit with NIR Brix ratings above 16°. Their Jebel Ali 7-day transit is our most dependable corridor.',
      metric: '65 FCLs Annual Contract',
      stars: 5
    },
    {
      name: 'Oliver Thorne',
      role: 'Global Sourcing Director',
      company: 'Premier Orchard UK Ltd',
      location: 'London & Felixstowe, United Kingdom',
      quote: 'Full BRCGS Grade AA compliance and spotless pesticide MRL reports make custom clearance at London Gateway immediate. The quality of their Chilean table grapes and air-express cherries is unmatched in the UK market.',
      metric: '99.8% Quality Pass Rate',
      stars: 5
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Global Importer Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trusted by Wholesale Supermarkets Worldwide
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Read direct feedback from international fresh produce distributors across Europe, the GCC, and Asia Pacific.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6 relative"
            >
              <Quote className="w-8 h-8 text-emerald-500/20 absolute top-6 right-6" />

              <div className="space-y-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {t.name}
                </div>
                <div className="text-xs text-slate-500">{t.role}</div>
                <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{t.company}</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>{t.location}</span>
                </div>

                <div className="mt-3 bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-lg">
                  {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
