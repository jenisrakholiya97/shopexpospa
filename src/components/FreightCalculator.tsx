import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FRUIT_PRODUCTS, DESTINATION_PORTS } from '../data/fruitsData';
import { 
  Calculator, 
  Ship, 
  Plane, 
  Container, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Plus, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';

export default function FreightCalculator() {
  const { 
    formatPrice, 
    addToInquiry, 
    calculatorTargetFruit, 
    setCalculatorTargetFruit,
    showToast 
  } = useApp();

  const [selectedFruitId, setSelectedFruitId] = useState<string>(calculatorTargetFruit || FRUIT_PRODUCTS[0].id);
  const [selectedPortId, setSelectedPortId] = useState<string>(DESTINATION_PORTS[0].id);
  const [containersCount, setContainersCount] = useState<number>(1);
  const [customMT, setCustomMT] = useState<number>(21.0); // 1 Reefer is ~ 21 MT
  const [useContainers, setUseContainers] = useState<boolean>(true);
  const [transportMode, setTransportMode] = useState<'Ocean Reefer (40ft HC)' | 'Air Freight Express'>('Ocean Reefer (40ft HC)');
  const [incoterm, setIncoterm] = useState<'CIF' | 'FOB' | 'CFR' | 'EXW'>('CIF');

  // Keep state synced with context target fruit
  React.useEffect(() => {
    if (calculatorTargetFruit) {
      setSelectedFruitId(calculatorTargetFruit);
    }
  }, [calculatorTargetFruit]);

  const fruit = useMemo(() => {
    return FRUIT_PRODUCTS.find((f) => f.id === selectedFruitId) || FRUIT_PRODUCTS[0];
  }, [selectedFruitId]);

  const port = useMemo(() => {
    return DESTINATION_PORTS.find((p) => p.id === selectedPortId) || DESTINATION_PORTS[0];
  }, [selectedPortId]);

  const totalMetricTons = useContainers ? containersCount * 21 : customMT;
  const totalKg = totalMetricTons * 1000;
  const approximateCartons = Math.round(totalKg / fruit.boxWeightKg);

  // Calculation Breakdown
  const calculations = useMemo(() => {
    const baseFruitCostUSD = totalKg * fruit.pricePerKgUSD;
    
    // Precooling and Modified Atmosphere Packaging charge
    const packingAndPrecoolingUSD = totalMetricTons * 45;

    // Terminal handling & phytosanitary inspection ($350 per container or $180 air pallet)
    const handlingAndPhytoUSD = useContainers ? containersCount * 380 : Math.max(250, (totalMetricTons / 2) * 200);

    // Freight charge
    let freightUSD = 0;
    if (incoterm === 'CIF' || incoterm === 'CFR') {
      if (transportMode === 'Ocean Reefer (40ft HC)') {
        const reefersNeeded = Math.ceil(totalMetricTons / 21);
        freightUSD = reefersNeeded * port.reeferOceanRatePerFCL;
      } else {
        // Air Freight
        freightUSD = totalKg * port.airFreightPerKg;
      }
    }

    // Cargo Insurance (0.35% for CIF)
    let insuranceUSD = 0;
    if (incoterm === 'CIF') {
      insuranceUSD = (baseFruitCostUSD + freightUSD) * 0.0035;
    }

    const totalCostUSD = baseFruitCostUSD + packingAndPrecoolingUSD + handlingAndPhytoUSD + freightUSD + insuranceUSD;
    const costPerKgUSD = totalKg > 0 ? totalCostUSD / totalKg : 0;
    const costPerBoxUSD = approximateCartons > 0 ? totalCostUSD / approximateCartons : 0;

    return {
      baseFruitCostUSD,
      packingAndPrecoolingUSD,
      handlingAndPhytoUSD,
      freightUSD,
      insuranceUSD,
      totalCostUSD,
      costPerKgUSD,
      costPerBoxUSD
    };
  }, [fruit, port, totalMetricTons, totalKg, approximateCartons, incoterm, transportMode, useContainers, containersCount]);

  const handleAddConsignment = () => {
    addToInquiry({
      product: fruit,
      quantityMT: totalMetricTons,
      packagingName: fruit.packagingTypes[0].name,
      transportMode: transportMode
    });
  };

  return (
    <section id="calculator" className="py-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Trade Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            FOB & CIF Export Price Calculator
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Instantly model landed costs, reefer ocean freight, phytosanitary inspection fees, and transit schedules for major global container ports.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-6">
            
            {/* Step 1: Select Fruit Variety */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                1. Select Export Fruit Variety
              </label>
              <div className="relative">
                <select
                  value={selectedFruitId}
                  onChange={(e) => {
                    setSelectedFruitId(e.target.value);
                    setCalculatorTargetFruit(e.target.value);
                  }}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  id="calc-fruit-select"
                >
                  {FRUIT_PRODUCTS.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.variety}) — HS {f.hsCode}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span>Origin: <strong className="text-emerald-700 dark:text-emerald-300">{fruit.primaryOrigin}</strong></span>
                <span>•</span>
                <span>Brix: <strong className="text-amber-600 dark:text-amber-400">{fruit.brixScore}</strong></span>
                <span>•</span>
                <span>Temp: <strong className="text-cyan-600 dark:text-cyan-400">{fruit.coldChainTemp}</strong></span>
              </div>
            </div>

            {/* Step 2: Destination Port */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                2. Select Destination Port & Trade Lane
              </label>
              <select
                value={selectedPortId}
                onChange={(e) => setSelectedPortId(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                id="calc-port-select"
              >
                {DESTINATION_PORTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.country}) — Transit ~{p.transitDays} Days
                  </option>
                ))}
              </select>
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span className="flex items-center gap-1">
                  <Ship className="w-3.5 h-3.5 text-emerald-600" />
                  Estimated Ocean Transit: <strong className="text-slate-800 dark:text-slate-200">{port.transitDays} Days</strong>
                </span>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-semibold text-[11px]">
                  Region: {port.region}
                </span>
              </div>
            </div>

            {/* Step 3: Volume & Containers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  3. Export Volume & Consignment Size
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setUseContainers(true)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition ${
                      useContainers ? 'bg-emerald-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    40ft Reefer Units
                  </button>
                  <button
                    onClick={() => setUseContainers(false)}
                    className={`px-2.5 py-1 rounded-lg font-bold text-xs transition ${
                      !useContainers ? 'bg-emerald-700 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Custom MT
                  </button>
                </div>
              </div>

              {useContainers ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {[1, 2, 3, 5, 10].map((count) => (
                      <button
                        key={count}
                        onClick={() => setContainersCount(count)}
                        className={`py-3 px-2 rounded-xl text-xs font-black border-2 transition cursor-pointer text-center ${
                          containersCount === count
                            ? 'bg-emerald-700 text-white border-emerald-500 shadow-md'
                            : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 hover:border-emerald-500'
                        }`}
                      >
                        <div className={containersCount === count ? 'text-white font-black text-sm' : 'text-slate-900 dark:text-white font-extrabold text-sm'}>
                          {count} FCL
                        </div>
                        <div className={containersCount === count ? 'text-emerald-200 text-[10px] font-bold' : 'text-slate-500 text-[10px] font-semibold'}>
                          ({count * 21} MT)
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    * Standard 40ft High Cube refrigerated container accommodates approximately 21 MT (~{approximateCartons} export cartons).
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="0.5"
                    value={customMT}
                    onChange={(e) => setCustomMT(parseFloat(e.target.value))}
                    className="flex-1 accent-emerald-600"
                  />
                  <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 px-3 py-1.5 rounded-xl text-sm font-black text-slate-900 dark:text-white">
                    {customMT.toFixed(1)} MT
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Incoterms & Transport Mode */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Incoterms 2020
                </label>
                <div className="grid grid-cols-4 gap-1.5 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
                  {(['CIF', 'FOB', 'CFR', 'EXW'] as const).map((term) => (
                    <button
                      key={term}
                      onClick={() => setIncoterm(term)}
                      className={`py-2 rounded-lg text-xs font-black transition cursor-pointer text-center ${
                        incoterm === term
                          ? 'bg-emerald-700 text-white shadow-sm border border-emerald-500'
                          : 'text-slate-800 dark:text-slate-200 hover:text-emerald-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className={incoterm === term ? 'text-white font-black' : 'font-bold'}>{term}</span>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {incoterm === 'CIF' && 'Cost, Marine Insurance & Reefer Freight to port'}
                  {incoterm === 'FOB' && 'Loaded on vessel at departure port'}
                  {incoterm === 'CFR' && 'Cost & Freight without marine cargo insurance'}
                  {incoterm === 'EXW' && 'Ex-Works packing facility loading dock'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Transport Method
                </label>
                <div className="grid grid-cols-2 gap-2 bg-white dark:bg-slate-900 p-1.5 rounded-xl border border-slate-300 dark:border-slate-700">
                  <button
                    onClick={() => setTransportMode('Ocean Reefer (40ft HC)')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black transition cursor-pointer ${
                      transportMode === 'Ocean Reefer (40ft HC)'
                        ? 'bg-emerald-700 text-white shadow-sm border border-emerald-500'
                        : 'text-slate-800 dark:text-slate-200 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                  >
                    <Ship className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={transportMode === 'Ocean Reefer (40ft HC)' ? 'text-white font-black' : 'font-bold'}>Ocean Reefer</span>
                  </button>
                  <button
                    onClick={() => setTransportMode('Air Freight Express')}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-black transition cursor-pointer ${
                      transportMode === 'Air Freight Express'
                        ? 'bg-emerald-700 text-white shadow-sm border border-emerald-500'
                        : 'text-slate-800 dark:text-slate-200 hover:text-emerald-700 hover:bg-slate-100'
                    }`}
                  >
                    <Plane className="w-4 h-4 text-sky-400 shrink-0" />
                    <span className={transportMode === 'Air Freight Express' ? 'text-white font-black' : 'font-bold'}>Air Cargo</span>
                  </button>
                </div>
              </div>
            </div>


          </div>

          {/* Quotation Summary Card (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-800/40 space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-emerald-800/50">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                  Proforma Quotation Estimate
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  {incoterm} {port.name}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-800/60 flex items-center justify-center text-emerald-300">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            {/* Consignment Specs */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3.5 rounded-2xl border border-emerald-900/40">
              <div>
                <span className="text-slate-400">Product:</span>
                <div className="font-bold text-emerald-300 truncate">{fruit.name}</div>
              </div>
              <div>
                <span className="text-slate-400">Volume:</span>
                <div className="font-bold text-white">{totalMetricTons.toFixed(1)} MT ({approximateCartons} boxes)</div>
              </div>
              <div>
                <span className="text-slate-400">Target Temp:</span>
                <div className="font-bold text-cyan-300">{fruit.coldChainTemp}</div>
              </div>
              <div>
                <span className="text-slate-400">Estimated Transit:</span>
                <div className="font-bold text-amber-300">
                  {transportMode === 'Air Freight Express' ? '24 - 48 Hours' : `~${port.transitDays} Days Ocean`}
                </div>
              </div>
            </div>

            {/* Line Items Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Base Fruit Value ({totalKg.toLocaleString()} kg @ ${fruit.pricePerKgUSD}/kg)</span>
                <span className="font-mono font-bold text-white">{formatPrice(calculations.baseFruitCostUSD)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Pre-cooling & MAP Modified Packaging ($45/MT)</span>
                <span className="font-mono font-bold text-white">{formatPrice(calculations.packingAndPrecoolingUSD)}</span>
              </div>

              <div className="flex justify-between text-slate-300">
                <span>Port Terminal Handling & Phytosanitary Clear</span>
                <span className="font-mono font-bold text-white">{formatPrice(calculations.handlingAndPhytoUSD)}</span>
              </div>

              {incoterm !== 'FOB' && incoterm !== 'EXW' && (
                <div className="flex justify-between text-slate-300">
                  <span>Reefer Ocean Freight ({transportMode.includes('Air') ? 'Air Cargo' : `${Math.ceil(totalMetricTons/21)} x 40ft HC`})</span>
                  <span className="font-mono font-bold text-emerald-300">{formatPrice(calculations.freightUSD)}</span>
                </div>
              )}

              {incoterm === 'CIF' && (
                <div className="flex justify-between text-slate-300">
                  <span>All-Risk Marine Cargo Insurance (0.35%)</span>
                  <span className="font-mono font-bold text-emerald-300">{formatPrice(calculations.insuranceUSD)}</span>
                </div>
              )}
            </div>

            {/* Grand Total Proforma Block */}
            <div className="pt-4 border-t border-emerald-800/60 bg-emerald-900/30 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-3xl">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    Total Estimated {incoterm} Proforma
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white">
                    {formatPrice(calculations.totalCostUSD)}
                  </div>
                </div>
                <div className="text-left sm:text-right text-xs">
                  <div className="text-slate-300">Unit Landed Cost:</div>
                  <div className="font-extrabold text-amber-300 text-sm">
                    {formatPrice(calculations.costPerKgUSD)} / kg
                  </div>
                  <div className="text-[11px] text-slate-400">
                    ({formatPrice(calculations.costPerBoxUSD)} / box)
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleAddConsignment}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-sm sm:text-base py-3.5 sm:py-4 px-4 sm:px-6 rounded-2xl shadow-xl shadow-emerald-950/40 transition transform hover:-translate-y-0.5 border-2 border-emerald-500 cursor-pointer"
                id="calc-add-basket-button"
              >
                <Plus className="w-5 h-5 text-white shrink-0" />
                <span className="text-white font-black tracking-wide">+ Add This Consignment to Inquiry Basket</span>
              </button>


              <p className="text-[10px] text-slate-400 text-center mt-3 mb-0">
                * Indicative pricing subject to current bunker adjustment factor (BAF) and daily harvest availability. Official formal quote issued upon RFQ receipt.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
