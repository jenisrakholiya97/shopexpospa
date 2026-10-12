import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Thermometer, 
  ShieldCheck, 
  Ship, 
  Plane, 
  Scale, 
  Layers, 
  MapPin, 
  FileCheck, 
  Calendar, 
  Package, 
  CheckCircle, 
  Plus, 
  Sparkles,
  Calculator
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    selectedProductModal, 
    setSelectedProductModal, 
    formatPrice, 
    addToInquiry, 
    openCalculatorWithProduct 
  } = useApp();

  const [quantity, setQuantity] = useState<number>(20); // Default 20 MT
  const [selectedPackagingIdx, setSelectedPackagingIdx] = useState<number>(0);

  if (!selectedProductModal) return null;

  const fruit = selectedProductModal;
  const isAir = fruit.recommendedTransport.includes('Air');

  const handleAdd = () => {
    addToInquiry({
      product: fruit,
      quantityMT: Number(quantity),
      packagingName: fruit.packagingTypes[selectedPackagingIdx].name,
      transportMode: fruit.recommendedTransport
    });
    setSelectedProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition"
          aria-label="Close specification dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Banner */}
        <div className="relative h-48 sm:h-72 overflow-hidden bg-slate-900">
          <img
            src={fruit.imageUrl}
            alt={fruit.name}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-600 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded uppercase">
                HS Code: {fruit.hsCode}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-[11px] font-semibold px-2.5 py-0.5 rounded">
                {fruit.exportGrade}
              </span>
              <span className="bg-amber-500/80 text-[11px] font-bold px-2.5 py-0.5 rounded">
                Brix: {fruit.brixScore}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">{fruit.name}</h2>
            <p className="text-xs sm:text-sm text-slate-300 italic mt-0.5">
              {fruit.scientificName} • Variety: {fruit.variety}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-280px)] overflow-y-auto">
          
          {/* Overview Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-1">
              Export Profile & Flavor Summary
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {fruit.description}
            </p>
            <div className="mt-2 text-xs bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-3 rounded-xl text-amber-900 dark:text-amber-200">
              <strong>Flavor & Quality Profile:</strong> {fruit.flavorProfile}
            </div>
          </div>

          {/* Technical Specifications Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-3">
              Phytosanitary & Cold-Chain Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-xs font-bold mb-1">
                  <Thermometer className="w-4 h-4" />
                  <span>Optimum Reefer Temp</span>
                </div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {fruit.coldChainTemp}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Humidity: {fruit.humidity}</div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 text-xs font-bold mb-1">
                  <Layers className="w-4 h-4" />
                  <span>Controlled Atmosphere</span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">
                  {fruit.controlledAtmosphere}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Shelf Life: {fruit.shelfLifeDays} days</div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Origins & Harvest</span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {fruit.originCountries.join(', ')}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{fruit.harvestSeason}</div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold mb-1">
                  <Ship className="w-4 h-4" />
                  <span>Minimum Order (Ocean)</span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {fruit.minOrderFCL}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Pallet: {fruit.palletLoad}</div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 text-xs font-bold mb-1">
                  <Plane className="w-4 h-4" />
                  <span>Minimum Order (Air)</span>
                </div>
                <div className="font-bold text-xs text-slate-900 dark:text-white">
                  {fruit.minOrderAir}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Direct 24-48h Airport Delivery</div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Audit Certifications</span>
                </div>
                <div className="font-bold text-[11px] text-slate-900 dark:text-white line-clamp-1">
                  {fruit.certifications.join(' • ')}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">100% Traceability Lot ID</div>
              </div>
            </div>
          </div>

          {/* Packaging Configurations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-2">
              Select Export Packaging Configuration
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {fruit.packagingTypes.map((pkg, idx) => (
                <div
                  key={pkg.name}
                  onClick={() => setSelectedPackagingIdx(idx)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition ${
                    selectedPackagingIdx === idx
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {pkg.name}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                      {pkg.weightKg} kg
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {pkg.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500">
                Quantity (Metric Tons)
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="w-20 sm:w-24 px-3 py-1.5 text-sm font-bold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl"
                />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">MT</span>
                <span className="text-[10px] sm:text-[11px] text-slate-400">
                  (~{Math.round((quantity * 1000) / fruit.packagingTypes[selectedPackagingIdx].weightKg)} cartons)
                </span>
              </div>
            </div>

            <div className="border-l border-slate-200 dark:border-slate-800 pl-4">
              <div className="text-[10px] uppercase font-bold text-slate-500">
                Estimated Fruit Value
              </div>
              <div className="text-sm sm:text-base font-black text-emerald-800 dark:text-emerald-300">
                {formatPrice(fruit.pricePerKgUSD * quantity * 1000)}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setSelectedProductModal(null);
                openCalculatorWithProduct(fruit.id);
              }}
              className="flex items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border-2 border-slate-300 dark:border-slate-600 text-xs font-black px-4 py-2.5 rounded-xl shadow-sm transition cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-extrabold text-slate-900 dark:text-white">Calculate Freight</span>
            </button>

            <button
              onClick={handleAdd}
              className="flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-black px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer border border-emerald-500"
            >
              <Plus className="w-4 h-4 text-white shrink-0" />
              <span className="text-white font-black tracking-wide">Add to Quote Basket</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
