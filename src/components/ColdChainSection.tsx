import React, { useState } from 'react';
import { 
  ThermometerSnowflake, 
  Cpu, 
  ShieldCheck, 
  Ship, 
  Wind, 
  CheckCircle2, 
  Eye, 
  Box, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ColdChainSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: 'Rapid Field Pre-Cooling (< 120 Minutes)',
      kicker: 'Step 01 • Core Heat Removal',
      description: 'Immediately upon harvesting at dawn, fruits enter our specialized forced-air cooling or hydro-cooling tunnels to remove latent field heat down to target pulp temperature within two hours.',
      stat: '98% Respiration Reduction',
      icon: Wind
    },
    {
      title: 'Automated Optical Sizing & NIR Brix Sorting',
      kicker: 'Step 02 • Quality Grading',
      description: 'High-speed multi-spectral optical cameras examine 360° fruit surface for blemishes, sunburn, and skin defects, while Near-Infrared (NIR) sensors calculate sugar content (Brix) non-destructively.',
      stat: '0.1mm Caliber Precision',
      icon: Eye
    },
    {
      title: 'Modified Atmosphere Packaging (MAP)',
      kicker: 'Step 03 • Micro-Perforated Liners',
      description: 'Fruits are packed in humidity-regulating, micro-perforated bags with food-grade ethylene scrubbing sachets that slow natural senescence and prevent moisture loss.',
      stat: 'Zero Condensation Decay',
      icon: Box
    },
    {
      title: 'Pre-tripped 40ft HC Reefers with IoT Telematics',
      kicker: 'Step 04 • High-Tech Ocean Voyage',
      description: 'Loaded into rigorously sanitized, PTI-tested Carrier Transicold & Daikin PrimeLINE reefers. Pallet airflow chimneys are maintained with dual internal temperature data loggers.',
      stat: '+/− 0.3°C Constant Temp',
      icon: ThermometerSnowflake
    },
    {
      title: 'Green Channel Customs & Port Dispatch',
      kicker: 'Step 05 • Frictionless Import Arrival',
      description: 'Pre-cleared electronic Phytosanitary certificates and automated FDA/EU prior notices allow instantaneous discharge onto refrigerated domestic delivery trailers upon port arrival.',
      stat: '99.4% On-Time Clearance',
      icon: ShieldCheck
    }
  ];

  return (
    <section id="coldchain" className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 border border-cyan-300 dark:border-cyan-800 text-cyan-900 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-600" />
            <span>Patented Cold Chain Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Zero-Break Cold Chain & Packhouse Engineering
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            How we deliver orchard-fresh crunch, high sugar retention, and extended supermarket shelf life across 25-day ocean voyages.
          </p>
        </div>

        {/* Dual Visual Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Logistics Terminal Photo */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group">
            <div className="aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src="/assets/images/cold_chain_logistics.jpg"
                alt="Cold chain shipping containers and vessel at port terminal"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                Intermodal Terminal Operations
              </span>
              <h3 className="text-xl font-bold mt-1">
                40ft High Cube Controlled Atmosphere (CA) Fleet
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Automated atmosphere injection controls O2 and CO2 levels to put fruit into suspended animation during voyages to Europe, the Middle East, and North America.
              </p>
            </div>
          </div>

          {/* Card 2: Packhouse Sorting Photo */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 group">
            <div className="aspect-[16/10] overflow-hidden bg-slate-950">
              <img
                src="/assets/images/fruit_packhouse_tech.jpg"
                alt="Automated optical sorting conveyors and quality inspection at certified packhouse"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                Hygienic Optical Packhouse
              </span>
              <h3 className="text-xl font-bold mt-1">
                High-Speed AI Spectrometry & Mechanical Calibrators
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                Aweta and Compac optical sorters classify 10 tons of fruit per hour, guaranteeing 100% uniformity in box weight, fruit diameter, color percentage, and internal sweetness.
              </p>
            </div>
          </div>

        </div>

        {/* 5-Step Interactive Protocol Walkthrough */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Step Selection List */}
            <div className="lg:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                5-Stage Freshness Protocol
              </div>
              {steps.map((s, idx) => {
                const IconComponent = s.icon;
                const isActive = activeStep === idx;
                return (
                  <div
                    key={s.title}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        {s.kicker}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {s.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Step Details Panel */}
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/60 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  {steps[activeStep].kicker}
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {steps[activeStep].title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {steps[activeStep].description}
              </p>

              {/* Verified Performance Metric Box */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    Audit Verification Metric
                  </div>
                  <div className="text-xl font-extrabold text-emerald-700 dark:text-emerald-300">
                    {steps[activeStep].stat}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>ISO 22000 Verified</span>
                </div>
              </div>

              {/* Quick Checklist */}
              <div className="grid grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No Chemical Waxing Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Recyclable FSC Cartons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dual GPS/Temp Data Loggers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Marine Cargo Insurance Backed</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
