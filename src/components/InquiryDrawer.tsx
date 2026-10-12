import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DESTINATION_PORTS } from '../data/fruitsData';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Container, 
  Send, 
  FileCheck2, 
  Sparkles, 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Ship, 
  CheckCircle2,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InquiryDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    inquiryItems, 
    updateInquiryQuantity, 
    removeFromInquiry, 
    clearInquiry, 
    formatPrice,
    totalInquiryMT,
    containerLoadPercent,
    showToast
  } = useApp();

  const [companyName, setCompanyName] = useState('Rotterdam Fresh Hub B.V.');
  const [contactName, setContactName] = useState('Lars Van Der Meer');
  const [email, setEmail] = useState('procurement@rotterdamfresh.eu');
  const [phone, setPhone] = useState('+31 10 790 4800');
  const [destinationPort, setDestinationPort] = useState(DESTINATION_PORTS[0].name);
  const [incoterm, setIncoterm] = useState('CIF');
  const [targetArrivalDate, setTargetArrivalDate] = useState('2026-11-15');
  const [notes, setNotes] = useState('Require dual thermograph loggers and GlobalG.A.P. chain of custody certificate with Bill of Lading.');

  const [submittedRfq, setSubmittedRfq] = useState<{
    rfqNumber: string;
    timestamp: string;
    totalAmount: number;
  } | null>(null);

  if (!isCartOpen) return null;

  const totalCalculatedValue = inquiryItems.reduce(
    (acc, item) => acc + item.quantityMT * 1000 * item.product.pricePerKgUSD,
    0
  );

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryItems.length === 0) {
      showToast('Please add at least one fruit consignment to your inquiry basket.');
      return;
    }

    const rfqId = `FRX-RFQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedRfq({
      rfqNumber: rfqId,
      timestamp: new Date().toLocaleString(),
      totalAmount: totalCalculatedValue
    });

    // Fire celebratory confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSubmittedRfq(null);
    clearInquiry();
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800">
          
          {/* Header */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Container className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  Consignment Inquiry Basket
                </h2>
                <p className="text-xs text-slate-500">
                  Direct FOB / CIF Request for Quotation (RFQ)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              aria-label="Close consignment drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If already submitted, show confirmation screen */}
          {submittedRfq ? (
            <div className="flex-1 p-8 overflow-y-auto space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Official RFQ Dispatched
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Proforma Request Created!
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  Our International Export Desk has logged your consignment inquiry. A formalized commercial offer with cold-chain transit schedule and bank coordinates is being dispatched to <strong>{email}</strong>.
                </p>
              </div>

              {/* Reference Details Box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 text-left space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">RFQ Reference ID:</span>
                  <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{submittedRfq.rfqNumber}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Importer Entity:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{companyName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Destination Port:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{destinationPort} ({incoterm})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Total Volume:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{totalInquiryMT.toFixed(1)} MT</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Estimated Consignment Value:</span>
                  <span className="font-mono font-black text-emerald-800 dark:text-emerald-300 text-sm">
                    {formatPrice(submittedRfq.totalAmount)}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <button
                  onClick={() => alert(`Downloaded Official Proforma ${submittedRfq.rfqNumber}.pdf`)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Proforma Quotation PDF</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-3 px-4 rounded-xl transition"
                >
                  Done & Clear Consignment
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Container Fill Progress Meter */}
              <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border-b border-emerald-200/60 dark:border-emerald-800/40">
                <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span className="text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5">
                    <Ship className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    40ft High Cube Container Load:
                  </span>
                  <span className="text-emerald-800 dark:text-emerald-300 font-mono">
                    {totalInquiryMT.toFixed(1)} MT / 21.0 MT ({containerLoadPercent}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-emerald-200 dark:bg-emerald-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      containerLoadPercent >= 100 ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, containerLoadPercent)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-emerald-800/70 dark:text-emerald-400/80 mt-1">
                  <span>Standard 40ft Reefer Capacity: ~21 Metric Tons</span>
                  <span>{containerLoadPercent >= 100 ? '✓ Full Container Load (FCL)' : 'Less than Container Load (LCL / Air)'}</span>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {inquiryItems.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 space-y-3">
                    <Container className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
                    <p className="text-sm">Your consignment inquiry basket is currently empty.</p>
                    <p className="text-xs text-slate-500">
                      Browse our export catalogue or use the freight calculator to add fresh fruit lots.
                    </p>
                  </div>
                ) : (
                  inquiryItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 truncate">
                          {item.packagingName}
                        </div>
                        <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                          {formatPrice(item.quantityMT * 1000 * item.product.pricePerKgUSD)}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-700 p-1 rounded-xl">
                        <button
                          onClick={() => updateInquiryQuantity(item.product.id, Math.max(0.5, item.quantityMT - 1.0))}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-black hover:bg-slate-200 transition cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black font-mono px-2 text-slate-900 dark:text-white">
                          {item.quantityMT.toFixed(1)} MT
                        </span>
                        <button
                          onClick={() => updateInquiryQuantity(item.product.id, item.quantityMT + 1.0)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 font-black hover:bg-emerald-200 transition cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromInquiry(item.product.id)}
                        className="flex items-center gap-1 px-2.5 py-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition text-xs font-bold cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4 shrink-0" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  ))
                )}


                {/* RFQ Importer Information Form */}
                {inquiryItems.length > 0 && (
                  <form id="rfq-inquiry-form" onSubmit={handleSubmitRfq} className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Consignee & Delivery Information
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Company Name</label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Contact Person</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Work Email</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Phone / WhatsApp</label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Destination Port</label>
                        <select
                          value={destinationPort}
                          onChange={(e) => setDestinationPort(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        >
                          {DESTINATION_PORTS.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name} ({p.country})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Incoterm Preferred</label>
                        <select
                          value={incoterm}
                          onChange={(e) => setIncoterm(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                        >
                          <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                          <option value="FOB">FOB (Free on Board)</option>
                          <option value="CFR">CFR (Cost & Freight)</option>
                          <option value="EXW">EXW (Ex-Works)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 mb-0.5">Special Cold-Chain / Compliance Notes</label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                      ></textarea>
                    </div>
                  </form>
                )}
              </div>

              {/* Drawer Sticky Footer with Subtotal & Dispatch Action */}
              {inquiryItems.length > 0 && (
                <div className="p-4 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-slate-500 font-bold uppercase text-[10px]">Indicative Subtotal:</span>
                      <div className="text-xl font-black text-emerald-800 dark:text-emerald-300 font-mono">
                        {formatPrice(totalCalculatedValue)}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={clearInquiry}
                      className="text-xs text-red-600 hover:text-red-700 font-extrabold hover:underline cursor-pointer px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      Clear All Items
                    </button>
                  </div>

                  <button
                    type="submit"
                    form="rfq-inquiry-form"
                    className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm py-3 sm:py-3.5 px-3 sm:px-4 rounded-xl shadow-xl transition cursor-pointer border-2 border-emerald-500"
                    id="submit-rfq-button"
                  >
                    <Send className="w-4 h-4 text-white shrink-0" />
                    <span className="text-white font-black tracking-wide">Dispatch Proforma RFQ to Export Desk</span>
                  </button>
                </div>
              )}

            </>
          )}

        </div>
      </div>
    </div>
  );
}
