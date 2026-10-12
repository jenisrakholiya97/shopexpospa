import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES } from '../data/fruitsData';
import { 
  Globe2, 
  Container, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Search,
  ChevronDown
} from 'lucide-react';

export default function Header() {
  const { 
    currency, 
    setCurrency, 
    unit, 
    setUnit, 
    inquiryItems, 
    setIsCartOpen,
    totalInquiryMT,
    containerLoadPercent 
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Export Catalog', href: '#catalog' },
    { label: 'FOB/CIF Calculator', href: '#calculator' },
    { label: 'Live Reefer Tracker', href: '#tracker' },
    { label: 'Cold-Chain Tech', href: '#coldchain' },
    { label: 'Seasonality Matrix', href: '#seasonality' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Export Desk', href: '#contact' }
  ];

  return (
    <>
      {/* Top Trade Ticker & Compliance Bar */}
      <div className="bg-[#0b281d] text-emerald-200 text-xs py-1.5 px-4 border-b border-emerald-900/60 overflow-hidden select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-hidden text-xs">
            <span className="inline-flex items-center gap-1.5 bg-emerald-800/80 text-emerald-300 font-semibold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider shrink-0 border border-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              Live Export Desks
            </span>
            <div className="hidden sm:flex items-center gap-4 text-emerald-200/90 truncate">
              <span>Rotterdam Harbor 🟢 Discharging</span>
              <span>•</span>
              <span>Jebel Ali Port 🟢 Reefer Berth 4</span>
              <span>•</span>
              <span>USDA/EU Organic Certified Lots</span>
              <span>•</span>
              <span>Current Reefer Fleet: 148 Active 40ft High-Cubes</span>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs">
            <div className="hidden md:flex items-center gap-1.5 text-emerald-300">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Direct Export Desk: +1 (800) 489-FRUIT</span>
            </div>
            <div className="flex items-center gap-2 border-l border-emerald-800/80 pl-3">
              <Globe2 className="w-3 h-3 text-emerald-400" />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-emerald-950/80 text-emerald-200 text-xs rounded border border-emerald-800/80 px-1.5 py-0.5 outline-none cursor-pointer focus:ring-1 focus:ring-emerald-400"
                aria-label="Select Currency"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code} className="bg-slate-900 text-white">
                    {c.code} ({c.symbol.trim()})
                  </option>
                ))}
              </select>

              <div className="flex bg-emerald-950/80 rounded border border-emerald-800/80 p-0.5 text-[10px]">
                {(['MT', 'Boxes', 'KG'] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-1.5 py-0.5 rounded transition ${
                      unit === u 
                        ? 'bg-emerald-600 text-white font-bold' 
                        : 'text-emerald-300 hover:text-white'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#0c1f17]/95 backdrop-blur-md shadow-lg border-b border-emerald-800/20 py-2.5'
            : 'bg-white/80 dark:bg-[#0e241c]/80 backdrop-blur-sm border-b border-emerald-600/15 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group no-underline shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-amber-400 flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition duration-200">
              <span className="text-lg sm:text-xl">🥭</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-emerald-950 dark:text-emerald-100 font-sans">
                  FRUTEX<span className="text-emerald-600 dark:text-emerald-400">GLOBAL</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded">
                  EST. 2012
                </span>
              </div>
              <p className="hidden md:block text-[11px] font-medium text-emerald-800/70 dark:text-emerald-400/80 m-0">
                Premium Agricultural Fresh Fruit Exports & Cold Chain
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-emerald-950/80 dark:text-emerald-200/90 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors py-1 relative no-underline after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 dark:after:bg-emerald-400 after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs: RFQ Basket & Quick Contact */}
          <div className="flex items-center gap-3">
            {/* Inquiry Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-emerald-50 dark:bg-emerald-950 hover:bg-emerald-100 dark:hover:bg-emerald-900 border-2 border-emerald-600 dark:border-emerald-500 text-slate-900 dark:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
              title="Open Export Consignment Basket"
              id="inquiry-basket-button"
            >
              <div className="relative">
                <Container className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
                {inquiryItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-black flex items-center justify-center animate-bounce shadow">
                    {inquiryItems.length}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider leading-none">
                  Inquiry Basket
                </div>
                <div className="text-xs font-black text-slate-900 dark:text-white leading-tight mt-0.5">
                  {totalInquiryMT.toFixed(1)} MT ({containerLoadPercent}%)
                </div>
              </div>
            </button>

            {/* Request Quote Button */}
            <a
              href="#calculator"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-black shadow-md shadow-emerald-900/25 transition duration-200 no-underline cursor-pointer border border-emerald-500"
              id="request-quote-nav-cta"
            >
              <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="text-white tracking-wide">Instant Proforma RFQ</span>
            </a>


            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-100"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#0f281e] border-b border-emerald-800/20 px-4 pt-3 pb-5 mt-2 space-y-2 shadow-xl animate-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-semibold text-emerald-950 dark:text-emerald-100 hover:bg-emerald-50 dark:hover:bg-emerald-900/50 no-underline"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-emerald-800/15 flex flex-col gap-2">
              <a
                href="#calculator"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white py-2.5 rounded-xl text-sm font-extrabold shadow no-underline"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Instant Proforma RFQ</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-sm font-extrabold shadow cursor-pointer"
              >
                <Container className="w-4 h-4" />
                <span>View Inquiry Basket ({totalInquiryMT.toFixed(1)} MT)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
