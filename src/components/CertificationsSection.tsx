import React from 'react';
import { CERTIFICATIONS } from '../data/fruitsData';
import { ShieldCheck, CheckCircle2, Award, FileCheck2, ExternalLink } from 'lucide-react';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Phytosanitary & Food Safety Compliance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            International Export Audits & Certifications
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            We adhere to rigorous international food safety criteria, ethical trading initiatives, and biological quarantine guidelines for every carton shipped.
          </p>
        </div>

        {/* Certifications Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.title}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {cert.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {cert.title}
                </h3>
                <div className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {cert.code}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {cert.description}
              </p>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Scope: <strong>{cert.scope}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Active
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
