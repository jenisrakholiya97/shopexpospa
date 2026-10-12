import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ThermometerSnowflake, 
  Ship, 
  ArrowRight, 
  CheckCircle2, 
  Award, 
  Sparkles, 
  Search,
  Anchor,
  Clock
} from 'lucide-react';

interface HeroProps {
  onSearchSubmit: (query: string) => void;
}

export default function Hero({ onSearchSubmit }: HeroProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
      const catalogEl = document.getElementById('catalog');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-10 lg:pb-24">
      {/* Decorative ambient background glows */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/40 via-emerald-50/10 to-transparent dark:from-emerald-950/30 dark:via-transparent -z-10 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines, Value Proposition & Quick Search */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold tracking-wide shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GlobalG.A.P. & USDA Organic Certified Fruit Exporter</span>
              <span className="text-emerald-500">•</span>
              <span className="text-amber-700 dark:text-amber-300 font-extrabold">2026 Harvest Open</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-emerald-950 dark:text-white leading-[1.08] font-sans">
              Farm-to-Port Premium{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-amber-500 bg-clip-text text-transparent">
                Fruit Exports
              </span>{' '}
              Across 45+ Nations
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-emerald-900/75 dark:text-emerald-200/80 leading-relaxed max-w-2xl">
              Delivering uncompromised freshness directly from certified partner orchards to global supermarkets, importers, and food service hubs. Backed by IoT-monitored refrigerated cold chains, automated optical grading, and guaranteed phytosanitary compliance.
            </p>

            {/* Search Bar on Hero */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center shadow-lg shadow-emerald-900/10 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-600/30 dark:border-emerald-700 p-1.5 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition gap-2 sm:gap-0">
                <div className="flex items-center flex-1 min-w-0">
                  <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 ml-3 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search fruit name, HS code (e.g. 0804)..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none min-w-0"
                    id="hero-search-input"
                  />
                </div>
                <button
                  type="submit"
                  className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition flex items-center justify-center gap-1.5 cursor-pointer"
                  id="hero-search-button"
                >
                  <span>Filter Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quick Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 pt-2">
              <a
                href="#catalog"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-emerald-900/20 transition transform hover:-translate-y-0.5 no-underline cursor-pointer border border-emerald-500 text-center"
                id="hero-catalog-btn"
              >
                <span className="text-white font-black">Browse 12+ Fruit Varieties</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </a>

              <a
                href="#calculator"
                className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white border-2 border-emerald-600 font-extrabold text-sm px-5 py-3.5 rounded-xl shadow-sm transition transform hover:-translate-y-0.5 no-underline cursor-pointer text-center"
                id="hero-calc-btn"
              >
                <Ship className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-slate-900 dark:text-white font-extrabold">Calculate FOB & CIF Rates</span>
              </a>

              <a
                href="#tracker"
                className="inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-bold text-xs px-4 py-3 rounded-xl transition no-underline cursor-pointer text-center"
                id="hero-tracker-btn"
              >
                <ThermometerSnowflake className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="font-bold text-slate-800 dark:text-slate-200">Live Reefer Telematics</span>
              </a>
            </div>


            {/* Trust Badges Row */}
            <div className="pt-4 border-t border-emerald-900/10 dark:border-emerald-800/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold">GlobalG.A.P. IFA V6</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200">
                <ThermometerSnowflake className="w-4 h-4 text-cyan-600 shrink-0" />
                <span className="font-semibold">Unbroken Cold Chain</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold">USDA/EU Bio Organic</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200">
                <Award className="w-4 h-4 text-purple-600 shrink-0" />
                <span className="font-semibold">BRCGS Food Safety AA</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset & Floating Live Widgets */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Visual Photo in Luxury Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-emerald-900/60 group">
                <img
                  src="/assets/images/hero_fruits_export.jpg"
                  alt="Export quality fresh fruits packed in branded wooden cartons"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none"></div>

                {/* Overlaid Port Tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/40 dark:border-slate-700 shadow-xl flex items-center justify-between">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      Export Ready • Lot #EXP-2026-904
                    </div>
                    <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                      Mangoes, Avocados, Pitahaya & Citrus
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-emerald-600 text-white font-black text-xs px-2.5 py-1 rounded-lg">
                      100% Pre-Cooled
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Live Telemetry Badge 1 */}
              <div className="absolute top-2 left-2 sm:-top-4 sm:-left-6 bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2.5 sm:gap-3 backdrop-blur-md z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                  <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    Reefer Telematics
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-emerald-200">
                    +11.8°C <span className="text-[10px] sm:text-xs text-emerald-500 font-semibold">(Target: +12°C)</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats Badge 2 */}
              <div className="absolute bottom-2 right-2 sm:-bottom-6 sm:-right-6 bg-white dark:bg-slate-900 p-2.5 sm:p-3.5 rounded-2xl shadow-xl border border-amber-500/30 flex items-center gap-2.5 sm:gap-3 backdrop-blur-md z-10">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-100 dark:bg-amber-950 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
                  <Ship className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
                    Global Export Metric
                  </div>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-amber-300">
                    48,000+ MT <span className="text-[10px] sm:text-xs text-slate-500">/ Year</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Global Key Metrics Ribbon */}
        <div className="mt-14 pt-8 border-t border-emerald-900/10 dark:border-emerald-800/30 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-800 dark:text-emerald-300">48,000+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-400/80 mt-1">
              Metric Tons Exported
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-800 dark:text-emerald-300">45+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-400/80 mt-1">
              Global Destination Ports
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-800 dark:text-emerald-300">99.4%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-400/80 mt-1">
              On-Time Reefer Discharges
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-white/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 shadow-sm">
            <div className="text-3xl lg:text-4xl font-extrabold text-emerald-800 dark:text-emerald-300">100%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-900/70 dark:text-emerald-400/80 mt-1">
              Phytosanitary Clean Clear
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
