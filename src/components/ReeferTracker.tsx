import React, { useState } from 'react';
import type { LiveShipment } from '../types/fruits';
import { LIVE_SHIPMENTS } from '../data/fruitsData';
import { 
  ThermometerSnowflake, 
  Ship, 
  MapPin, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Search, 
  Zap, 
  Wifi, 
  Compass, 
  Calendar,
  Layers
} from 'lucide-react';

export default function ReeferTracker() {
  const [selectedShipment, setSelectedShipment] = useState<LiveShipment>(LIVE_SHIPMENTS[0]);
  const [searchTracking, setSearchTracking] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = LIVE_SHIPMENTS.find((s) =>
      s.trackingNumber.toLowerCase().includes(searchTracking.toLowerCase().trim())
    );
    if (found) {
      setSelectedShipment(found);
    }
  };

  const handleDownloadLog = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section id="tracker" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="pointer-events-none absolute -bottom-40 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>Real-Time IoT Cold Chain Telematics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Live Container & Reefer Fleet Tracker
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every 40ft High Cube refrigerated container is linked to satellite telematics. Monitor internal core pulp temperature, relative humidity, ethylene scrubbing, and voyage coordinates 24/7.
          </p>
        </div>

        {/* Tracking Search & Preset Buttons */}
        <div className="max-w-2xl mx-auto mb-10 space-y-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter Container / B/L No. (e.g. FRX-ROT-8821, FRX-DXB-4410)..."
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono"
                id="reefer-search-input"
              />
            </div>
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs px-6 py-3 rounded-xl transition cursor-pointer shadow-md flex items-center justify-center shrink-0"
              id="reefer-search-button"
            >
              <span className="text-slate-950 font-black tracking-wider uppercase">Track B/L</span>
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-300 text-xs font-extrabold">Active Demo Containers:</span>
            {LIVE_SHIPMENTS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedShipment(s)}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition border cursor-pointer ${
                  selectedShipment.id === s.id
                    ? 'bg-cyan-400 text-slate-950 border-cyan-300 font-black shadow-md'
                    : 'bg-slate-800 text-cyan-200 border-slate-700 hover:border-cyan-400 font-bold hover:bg-slate-750'
                }`}
              >
                {s.trackingNumber} ({s.destinationPort.split(',')[0]})
              </button>
            ))}
          </div>
        </div>

        {/* Active Shipment Telemetry Dashboard */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Top Banner: Vessel & Status */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800">
                  {selectedShipment.trackingNumber}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {selectedShipment.status}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
                  <Wifi className="w-3 h-3 text-cyan-400" />
                  {selectedShipment.lastPingTime}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                {selectedShipment.vesselName}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Consignment: <strong className="text-emerald-300">{selectedShipment.productName}</strong> ({selectedShipment.quantityMT} MT)
              </p>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={handleDownloadLog}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-xs font-black text-cyan-200 hover:text-white px-4 py-3 rounded-xl border border-cyan-500/40 shadow-sm transition cursor-pointer"
                id="download-telemetry-btn"
              >
                <Download className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-extrabold">{downloadSuccess ? 'Downloaded CSV & Certificate ✓' : 'Download IoT Temperature Audit Log'}</span>
              </button>
            </div>
          </div>

          {/* Voyage Route Timeline */}
          <div className="px-6 py-8 sm:px-8 bg-slate-900/50 border-b border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Origin Port & ATD</span>
                <span className="font-bold text-white text-sm">{selectedShipment.originPort}</span>
                <div className="text-[11px] text-emerald-400 font-mono mt-0.5">{selectedShipment.departureDate}</div>
              </div>

              <div className="text-center hidden sm:block">
                <span className="text-xs font-extrabold text-cyan-400">
                  {selectedShipment.progressPercent}% Transit Completed
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Destination Port & ETA</span>
                <span className="font-bold text-white text-sm">{selectedShipment.destinationPort}</span>
                <div className="text-[11px] text-amber-400 font-mono mt-0.5">{selectedShipment.estimatedArrival}</div>
              </div>
            </div>

            {/* Progress Bar with Moving Ship */}
            <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-400 rounded-full transition-all duration-700"
                style={{ width: `${selectedShipment.progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* IoT Telemetry Gauges Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Gauge 1: Reefer Temperature */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="uppercase font-bold text-[11px]">Core Pulp Temp</span>
                <ThermometerSnowflake className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-3xl font-black text-cyan-300 font-mono">
                +{selectedShipment.tempCurrent.toFixed(1)}°C
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs">
                <span className="text-slate-400">Setpoint:</span>
                <span className="font-mono font-bold text-slate-200">+{selectedShipment.tempSetPoint.toFixed(1)}°C</span>
                <span className="text-emerald-400 font-bold ml-auto text-[10px]">Δ 0.1°C (Optimal)</span>
              </div>
            </div>

            {/* Gauge 2: Relative Humidity */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="uppercase font-bold text-[11px]">Relative Humidity</span>
                <Activity className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-300 font-mono">
                {selectedShipment.humidityCurrent}%
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <span>Moisture Target:</span>
                <span className="font-bold text-slate-200">85-95% RH</span>
                <span className="text-emerald-400 font-bold ml-auto text-[10px]">No Condensation</span>
              </div>
            </div>

            {/* Gauge 3: Ethylene Level */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="uppercase font-bold text-[11px]">Ethylene Filter</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-amber-300 font-mono">
                {selectedShipment.ethylenePpm} <span className="text-xs font-normal">ppm</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <span>Scrubber:</span>
                <span className="font-bold text-emerald-300">Active Catalyst</span>
                <span className="text-emerald-400 font-bold ml-auto text-[10px]">Anti-Ripening</span>
              </div>
            </div>

            {/* Gauge 4: Controlled Atmosphere */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="uppercase font-bold text-[11px]">CA Gases (O2 / CO2)</span>
                <Layers className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-xl font-black text-purple-300 font-mono mt-1">
                O2: {selectedShipment.o2Percent}% • CO2: {selectedShipment.co2Percent}%
              </div>
              <div className="flex items-center gap-1.5 mt-3 text-xs text-slate-400">
                <span>Power:</span>
                <span className="font-bold text-slate-200 truncate">{selectedShipment.powerStatus}</span>
              </div>
            </div>

          </div>

          {/* Bottom Security Assurance Note */}
          <div className="p-4 bg-slate-950 border-t border-slate-800/80 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full cold-chain compliance guaranteed. In-transit temperature drift under insurance warranty.</span>
            </div>
            <div className="font-mono text-[11px] text-cyan-400">
              Protocol: Daikin PrimeLINE / Carrier Transicold IoT
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
