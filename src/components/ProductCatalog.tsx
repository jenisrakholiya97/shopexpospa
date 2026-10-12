import React, { useState, useMemo } from 'react';
import type { FruitProduct, FruitCategory } from '../types/fruits';
import { FRUIT_PRODUCTS } from '../data/fruitsData';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  Thermometer, 
  Scale, 
  Calendar, 
  Plus, 
  Eye, 
  Calculator, 
  Plane, 
  Ship, 
  Sparkles, 
  Check, 
  Tag, 
  MapPin,
  ArrowUpDown,
  FileCheck2
} from 'lucide-react';

interface ProductCatalogProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function ProductCatalog({ searchQuery, setSearchQuery }: ProductCatalogProps) {
  const { 
    unit, 
    formatPrice, 
    currentCurrencyRate, 
    addToInquiry, 
    setSelectedProductModal, 
    openCalculatorWithProduct,
    showToast 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<FruitCategory>('all');
  const [selectedTransport, setSelectedTransport] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'shelflife' | 'brix'>('featured');

  const categories = [
    { id: 'all', label: 'All Fruits', icon: '🍎' },
    { id: 'tropical', label: 'Tropical & Exotic', icon: '🥭' },
    { id: 'citrus', label: 'Citrus & Orchard', icon: '🍊' },
    { id: 'berries', label: 'Berries & Grapes', icon: '🍇' },
    { id: 'stone-tree', label: 'Stone & Tree Fruits', icon: '🍒' },
  ];

  const filteredProducts = useMemo(() => {
    return FRUIT_PRODUCTS.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Transport filter
      if (selectedTransport !== 'all') {
        if (selectedTransport === 'ocean' && !product.recommendedTransport.includes('Ocean')) return false;
        if (selectedTransport === 'air' && !product.recommendedTransport.includes('Air')) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesVariety = product.variety.toLowerCase().includes(query);
        const matchesHs = product.hsCode.toLowerCase().includes(query);
        const matchesOrigin = product.originCountries.some((c) => c.toLowerCase().includes(query));
        if (!matchesName && !matchesVariety && !matchesHs && !matchesOrigin) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerKgUSD - b.pricePerKgUSD;
      if (sortBy === 'price-desc') return b.pricePerKgUSD - a.pricePerKgUSD;
      if (sortBy === 'shelflife') return b.shelfLifeDays - a.shelfLifeDays;
      if (sortBy === 'brix') return parseFloat(b.brixScore) - parseFloat(a.brixScore);
      // default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, selectedTransport, searchQuery, sortBy]);

  const handleQuickAdd = (product: FruitProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const isAir = product.recommendedTransport.includes('Air');
    const defaultQty = isAir ? 1.0 : 20.0; // 1 MT for Air or 20 MT for FCL
    addToInquiry({
      product,
      quantityMT: defaultQty,
      packagingName: product.packagingTypes[0].name,
      transportMode: product.recommendedTransport
    });
  };

  // Helper to format unit display price
  const getDisplayPrice = (product: FruitProduct) => {
    if (unit === 'MT') {
      const priceMT = product.pricePerKgUSD * 1000;
      return `${formatPrice(priceMT)} / MT`;
    }
    if (unit === 'Boxes') {
      return `${formatPrice(product.boxPriceUSD)} / Box (${product.boxWeightKg}kg)`;
    }
    // KG
    return `${formatPrice(product.pricePerKgUSD)} / KG`;
  };

  return (
    <section id="catalog" className="py-16 bg-slate-50/50 dark:bg-emerald-950/20 border-t border-slate-200/80 dark:border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Tag className="w-3.5 h-3.5" />
            <span>Commercial Export Catalogue • 2026 Season</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 dark:text-white tracking-tight">
            Certified Fresh Fruit Export Varieties
          </h2>
          <p className="mt-3 text-slate-600 dark:text-emerald-200/70 text-sm sm:text-base">
            Every lot is tested for Maximum Residue Limits (MRL), calibrated with electronic optical sizing, and packed in heavy-duty export grade cartons. Select items to calculate customized FOB/CIF quotes or add to your consignment inquiry.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 dark:border-slate-800 mb-8 space-y-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as FruitCategory)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-105 border border-emerald-500'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50/50'
                }`}
              >
                <span>{cat.icon}</span>
                <span className={selectedCategory === cat.id ? 'text-white font-black' : 'font-bold'}>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Secondary Filters: Transport, Search & Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search fruit name, HS code (e.g. 0804), origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-14 py-2.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Transport Filter */}
            <div className="lg:col-span-4 flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-300 dark:border-slate-700">
              <span className="text-[11px] font-black uppercase text-slate-600 dark:text-slate-400 pl-2 shrink-0">Transport:</span>
              <button
                onClick={() => setSelectedTransport('all')}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  selectedTransport === 'all' 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-700'
                }`}
              >
                <span className={selectedTransport === 'all' ? 'text-white' : ''}>All</span>
              </button>
              <button
                onClick={() => setSelectedTransport('ocean')}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  selectedTransport === 'ocean' 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-700'
                }`}
              >
                <Ship className="w-3.5 h-3.5 text-emerald-400" />
                <span className={selectedTransport === 'ocean' ? 'text-white' : ''}>Reefer FCL</span>
              </button>
              <button
                onClick={() => setSelectedTransport('air')}
                className={`flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                  selectedTransport === 'air' 
                    ? 'bg-emerald-700 text-white shadow-sm' 
                    : 'text-slate-700 dark:text-slate-300 hover:text-emerald-700'
                }`}
              >
                <Plane className="w-3.5 h-3.5 text-sky-400" />
                <span className={selectedTransport === 'air' ? 'text-white' : ''}>Air Express</span>
              </button>
            </div>


            {/* Sort Dropdown */}
            <div className="lg:col-span-3 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-white dark:bg-slate-900">Sort: Featured First</option>
                <option value="price-asc" className="bg-white dark:bg-slate-900">Price: Low to High</option>
                <option value="price-desc" className="bg-white dark:bg-slate-900">Price: High to Low</option>
                <option value="shelflife" className="bg-white dark:bg-slate-900">Shelf Life (Longest)</option>
                <option value="brix" className="bg-white dark:bg-slate-900">Brix Sweetness (High)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6">
          <span>
            Showing <strong className="text-emerald-950 dark:text-emerald-300">{filteredProducts.length}</strong> export fruit varieties
          </span>
          <span>
            Displaying price in: <strong className="text-emerald-700 dark:text-emerald-300">{unit}</strong>
          </span>
        </div>

        {/* Fruit Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((fruit) => (
            <div
              key={fruit.id}
              onClick={() => setSelectedProductModal(fruit)}
              className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer fruit-card-hover"
            >
              
              {/* Image & Overlays */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={fruit.imageUrl}
                  alt={fruit.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-108 transition duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/10"></div>

                {/* Badge Top Left */}
                {fruit.badge && (
                  <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-emerald-950 dark:text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-500/20 shadow-md">
                    {fruit.badge}
                  </div>
                )}

                {/* Transport Mode Badge Top Right */}
                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  {fruit.recommendedTransport.includes('Air') ? (
                    <>
                      <Plane className="w-3 h-3 text-sky-400" />
                      <span>Air Express</span>
                    </>
                  ) : (
                    <>
                      <Ship className="w-3 h-3 text-emerald-400" />
                      <span>Reefer FCL</span>
                    </>
                  )}
                </div>

                {/* HS Code & Origin Tag Bottom */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs gap-2">
                  <span className="font-mono bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold border border-white/20 shrink-0">
                    HS {fruit.hsCode}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold bg-emerald-950/70 backdrop-blur-sm px-2 py-0.5 rounded border border-emerald-500/30 min-w-0">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{fruit.primaryOrigin}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      {fruit.variety}
                    </span>
                    <span className="italic">{fruit.scientificName}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 transition">
                    {fruit.name}
                  </h3>

                  <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {fruit.description}
                  </p>
                </div>

                {/* Key Technical Metric Chips */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl flex items-center gap-2">
                    <Thermometer className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">Temp</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{fruit.coldChainTemp}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">Brix Sweetness</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{fruit.brixScore}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">Shelf Life</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{fruit.shelfLifeDays} Days</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/60 p-2 rounded-xl flex items-center gap-2">
                    <FileCheck2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">Grade</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200 text-xs mt-0.5">{fruit.exportGrade}</div>
                    </div>
                  </div>
                </div>

                {/* Price & Action Strip */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                  <div className="shrink-0">
                    <div className="text-[10px] uppercase font-bold text-slate-400 leading-none">
                      Indicative FOB Rate
                    </div>
                    <div className="text-base font-black text-emerald-800 dark:text-emerald-300 mt-1">
                      {getDisplayPrice(fruit)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openCalculatorWithProduct(fruit.id);
                      }}
                      className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-100 hover:text-emerald-900 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                      title="Calculate Freight & Proforma"
                    >
                      <Calculator className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="font-extrabold text-[11px]">Freight Calc</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(fruit, e)}
                      className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-black px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl shadow-md transition cursor-pointer border border-emerald-500"
                      title="Add to Quote Basket"
                    >
                      <Plus className="w-3.5 h-3.5 text-white shrink-0" />
                      <span className="text-white font-black tracking-wide">+ Quote</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
