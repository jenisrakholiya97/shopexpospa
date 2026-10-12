import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Globe2, 
  Ship, 
  Send, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Award,
  Container
} from 'lucide-react';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      
      {/* Newsletter / Crop Market Bulletin Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider text-[11px] mb-1">
              <Mail className="w-3.5 h-3.5" />
              <span>Weekly Crop & FOB Price Bulletin</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Subscribe to Global Fresh Fruit Export Market Intelligence
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Get weekly harvest yields, port freight rate fluctuations, and seasonal brix indexes delivered to your trading desk.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              placeholder="Enter corporate email..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-72"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-5 py-2.5 rounded-xl transition shrink-0 flex items-center justify-center gap-2 cursor-pointer shadow-md border border-emerald-500"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span className="font-extrabold text-white">{subscribed ? 'Subscribed ✓' : 'Subscribe'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-400 flex items-center justify-center text-lg">
              🥭
            </div>
            <span className="text-lg font-black tracking-tight text-white font-sans">
              FRUTEX<span className="text-emerald-400">GLOBAL</span>
            </span>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
            Premier agricultural exporter of certified tropical, citrus, stone, and berry fruits. Supplying direct FCL refrigerated ocean containers and air-freight consignments to supermarket retailers across 45+ countries.
          </p>

          <div className="flex flex-wrap gap-2 text-[10px] text-slate-400 pt-2">
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              FDA Reg: 18840291932
            </span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              GGN: 4059883719022
            </span>
            <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded">
              ISO 22000 Certified
            </span>
          </div>
        </div>

        {/* Column 2: Export Catalog */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
            Export Fruit Lines
          </h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><a href="#catalog" className="text-slate-400 hover:text-emerald-300 no-underline transition">Ratnagiri Alphonso Mango</a></li>
            <li><a href="#catalog" className="text-slate-400 hover:text-emerald-300 no-underline transition">Premium Hass Avocado</a></li>
            <li><a href="#catalog" className="text-slate-400 hover:text-emerald-300 no-underline transition">Golden MD2 Pineapple</a></li>
            <li><a href="#catalog" className="text-slate-400 hover:text-emerald-300 no-underline transition">Red & White Pitahaya</a></li>
            <li><a href="#catalog" className="text-slate-400 hover:text-emerald-300 no-underline transition">First Class Bananas</a></li>
            <li><a href="#catalog" className="text-slate-400 hover:text-emerald-300 no-underline transition">Seedless Table Grapes</a></li>
          </ul>
        </div>

        {/* Column 3: Logistics & Ports */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
            Trade Lanes & Hubs
          </h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><a href="#tracker" className="text-slate-400 hover:text-emerald-300 no-underline transition">Port of Rotterdam (NL)</a></li>
            <li><a href="#tracker" className="text-slate-400 hover:text-emerald-300 no-underline transition">Port of Jebel Ali (UAE)</a></li>
            <li><a href="#tracker" className="text-slate-400 hover:text-emerald-300 no-underline transition">Port of Singapore (SG)</a></li>
            <li><a href="#tracker" className="text-slate-400 hover:text-emerald-300 no-underline transition">Port of Long Beach (USA)</a></li>
            <li><a href="#tracker" className="text-slate-400 hover:text-emerald-300 no-underline transition">London Gateway (UK)</a></li>
            <li><a href="#calculator" className="text-slate-400 hover:text-emerald-300 no-underline transition">Port of Yokohama (JP)</a></li>
          </ul>
        </div>

        {/* Column 4: Trade Standards */}
        <div className="space-y-3">
          <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">
            Compliance & Tools
          </h4>
          <ul className="space-y-2 list-none p-0 m-0">
            <li><a href="#calculator" className="text-slate-400 hover:text-emerald-300 no-underline transition">FOB & CIF Calculator</a></li>
            <li><a href="#tracker" className="text-slate-400 hover:text-emerald-300 no-underline transition">Live Reefer IoT Telematics</a></li>
            <li><a href="#seasonality" className="text-slate-400 hover:text-emerald-300 no-underline transition">Harvest Seasonality Calendar</a></li>
            <li><a href="#coldchain" className="text-slate-400 hover:text-emerald-300 no-underline transition">Controlled Atmosphere Specs</a></li>
            <li><a href="#certifications" className="text-slate-400 hover:text-emerald-300 no-underline transition">Phytosanitary Protocols</a></li>
            <li><a href="#contact" className="text-slate-400 hover:text-emerald-300 no-underline transition">Request Sample Consignment</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-black/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} FRUTEX AGRO-GLOBAL EXPORTS LTD. All rights reserved. Incoterms&reg; 2020 Registered Trade Partner.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by TanStack Start SPA</span>
            <span className="text-emerald-400">● 100% Cold-Chain Integrity Guarantee</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
