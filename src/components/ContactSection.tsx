import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Building2, 
  Ship,
  Globe2
} from 'lucide-react';

export default function ContactSection() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    port: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your export desk message has been received! Our trader will contact you within 2 hours.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', port: '', message: '' });
    }, 4000);
  };

  const offices = [
    { city: 'Rotterdam Port Office', country: 'Netherlands', address: 'Maasvlakte 2, Haven 9200, 3088 GA Rotterdam', phone: '+31 10 790 4800' },
    { city: 'Dubai Jebel Ali Free Zone', country: 'UAE', address: 'JAFZA South 2, Cold Storage Hub B-4, Dubai', phone: '+971 4 881 9200' },
    { city: 'Singapore Jurong Port Hub', country: 'Singapore', address: '37 Jurong Port Road, Building C, Singapore 619110', phone: '+65 6265 1100' },
    { city: 'Central Export Packhouse', country: 'Mumbai / Ratnagiri, India', address: 'JNPT SEZ Logistics Park, Sector 8, Navi Mumbai 400707', phone: '+91 22 2789 5500' }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Commercial Trade Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect with our Export Traders
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Request annual supply agreements, custom packaging specifications, or schedule a cold-store inspection with our certified agronomists.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Inquiry Form */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800/50 p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              Send Direct Consignment Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Our trade desk responds with indicative FOB & CIF numbers within 2 hours during global business days.
            </p>

            {submitted ? (
              <div className="bg-emerald-100 dark:bg-emerald-950 p-8 rounded-2xl text-center space-y-3 border border-emerald-500/30">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950 dark:text-emerald-200">
                  Message Transmitted!
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  A senior export trade officer has been assigned to your request. You will receive complete product spec-sheets and harvest availability dates shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Mueller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. procurement@metrofruit.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Company / Wholesale Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Global Produce Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Destination Port
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rotterdam, Jebel Ali, Singapore"
                      value={formData.port}
                      onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Fruit Requirements, Volume & Target Window *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Specify fruit varieties (e.g. Alphonso Mangoes, Hass Avocados), approximate volume in 40ft containers, preferred Incoterm, and packaging specs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm py-4 px-6 rounded-xl shadow-lg shadow-emerald-800/30 transition cursor-pointer border border-emerald-600"
                  id="contact-submit-button"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span className="text-white font-extrabold tracking-wide">Send Direct Inquiry to Export Traders</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Global Port Offices & Hotline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Hotline Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white p-6 rounded-3xl shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-emerald-200">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300">
                    24/7 Reefer Emergency & Export Desk
                  </div>
                  <div className="text-lg font-extrabold text-white">
                    +1 (800) 489-FRUIT
                  </div>
                </div>
              </div>

              <div className="text-xs text-emerald-100/80 leading-relaxed border-t border-emerald-700/60 pt-3">
                Direct WhatsApp RFQ Hotline: <strong className="text-amber-300">+91 98200 44890</strong>. Immediate crop availability photos and cold-room temperature audits sent on request.
              </div>
            </div>

            {/* Global Port Offices List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Global Port Operational Hubs
              </h4>
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-3 text-xs"
                >
                  <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {office.city} <span className="text-slate-400 font-normal">({office.country})</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{office.address}</div>
                    <div className="text-emerald-700 dark:text-emerald-400 font-mono font-semibold mt-1">
                      {office.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
