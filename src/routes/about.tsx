import { createFileRoute } from '@tanstack/react-router'
import { ShieldCheck, Globe2, Award, ArrowLeft, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-6">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-900 no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Global Export Portal</span>
        </a>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            About Frutex Agro-Global
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white mt-1">
            Pioneering Farm-to-Port Cold Chain Fruit Exports
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Founded in 2012, FRUTEX GLOBAL connects certified family orchards and cooperative growers in premier tropical and temperate microclimates directly with leading supermarket chains, fruit auction markets, and wholesale distributors in 45+ countries.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">15,000+</div>
            <div className="text-xs font-bold uppercase text-slate-500 mt-1">Hectares Managed</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">48,000 MT</div>
            <div className="text-xs font-bold uppercase text-slate-500 mt-1">Annual Export Volume</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
            <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">100%</div>
            <div className="text-xs font-bold uppercase text-slate-500 mt-1">Traceable Lot GGNs</div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Ethical Agriculture & Climate Commitment
          </h2>
          <p>
            We practice precision drip irrigation, integrated pest management (IPM) to eliminate synthetic pesticide residues, and utilize 100% recyclable, FSC-certified export corrugated cartons. Every worker across our packhouses receives fair compensation under SMETA / Sedex ethical trade audits.
          </p>
        </div>
      </div>
    </main>
  )
}
