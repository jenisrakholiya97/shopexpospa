import React, { useState } from 'react';
import { FRUIT_PRODUCTS, MONTH_NAMES } from '../data/fruitsData';
import { useApp } from '../context/AppContext';
import { Calendar, Filter, Sparkles, Check, ArrowRight } from 'lucide-react';

export default function SeasonalityMatrix() {
  const { setSelectedProductModal } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<number>(4); // Month 4 = April (Peak mango & citrus)

  return (
    <section id="seasonality" className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Procurement Planning Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Global Harvest & Export Seasonality Matrix
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Plan your annual supermarket procurement contracts. Click any month to see which fresh fruit varieties are in peak harvest and export shipping readiness.
          </p>
        </div>

        {/* Month Selector Pills */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {MONTH_NAMES.map((name, index) => {
            const monthNum = index + 1;
            const isSelected = selectedMonth === monthNum;
            return (
              <button
                key={name}
                onClick={() => setSelectedMonth(monthNum)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-700/30 scale-105 border border-emerald-600 ring-2 ring-emerald-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>

        {/* Calendar Matrix Table */}
        <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="sm:hidden text-center text-[10px] font-bold text-slate-500 py-2 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            ← Swipe horizontally to explore all 12 harvest months →
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  <th className="py-4 px-5 font-bold text-slate-800 dark:text-slate-200 min-w-[200px]">
                    Fruit Product Variety
                  </th>
                  <th className="py-4 px-3 font-bold text-slate-600 dark:text-slate-400">
                    Primary Origin
                  </th>
                  {MONTH_NAMES.map((name, idx) => (
                    <th
                      key={name}
                      className={`py-4 px-2 text-center font-bold min-w-[42px] ${
                        selectedMonth === idx + 1
                          ? 'bg-emerald-600 text-white font-extrabold'
                          : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {name}
                    </th>
                  ))}
                  <th className="py-4 px-4 text-right font-bold text-slate-600 dark:text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {FRUIT_PRODUCTS.map((fruit) => {
                  const isAvailableThisMonth = fruit.harvestMonths.includes(selectedMonth);
                  return (
                    <tr
                      key={fruit.id}
                      className={`hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition ${
                        isAvailableThisMonth ? 'bg-white dark:bg-slate-900/60' : 'opacity-70'
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={fruit.imageUrl}
                            alt={fruit.name}
                            className="w-9 h-9 rounded-lg object-cover shrink-0"
                          />
                          <div>
                            <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                              {fruit.name}
                            </div>
                            <div className="text-[10px] text-slate-500">{fruit.variety}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3 text-slate-600 dark:text-slate-300 font-medium">
                        {fruit.primaryOrigin.split('(')[0]}
                      </td>

                      {MONTH_NAMES.map((_, idx) => {
                        const mNum = idx + 1;
                        const isHarvest = fruit.harvestMonths.includes(mNum);
                        const isCurrentActive = selectedMonth === mNum;
                        return (
                          <td
                            key={mNum}
                            className={`py-3.5 px-1 text-center ${
                              isCurrentActive ? 'bg-emerald-50 dark:bg-emerald-950/40' : ''
                            }`}
                          >
                            {isHarvest ? (
                              <span className="inline-block w-4 h-4 rounded-full bg-emerald-500 shadow-sm" title="Active Harvest & Export"></span>
                            ) : (
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                            )}
                          </td>
                        );
                      })}

                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedProductModal(fruit)}
                          className="inline-flex items-center gap-1.5 text-xs font-black bg-emerald-700 hover:bg-emerald-800 text-white px-3 py-1.5 rounded-lg shadow-sm transition cursor-pointer"
                        >
                          <span className="font-extrabold text-white">View Specs</span>
                          <ArrowRight className="w-3.5 h-3.5 text-white" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-100/70 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span>
                <span>Active Peak Harvest & Shipping Window</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span>Off-Season / Contract Pre-Booking Only</span>
              </span>
            </div>
            <div className="font-semibold text-emerald-800 dark:text-emerald-300">
              Selected: {MONTH_NAMES[selectedMonth - 1]} ({FRUIT_PRODUCTS.filter(f => f.harvestMonths.includes(selectedMonth)).length} varieties available)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
