import React, { createContext, useContext, useState, useEffect } from 'react';
import type { FruitProduct, InquiryItem, TransportMode } from '../types/fruits';

import { CURRENCIES, FRUIT_PRODUCTS } from '../data/fruitsData';

interface AppContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  unit: 'MT' | 'Boxes' | 'KG';
  setUnit: (unit: 'MT' | 'Boxes' | 'KG') => void;
  inquiryItems: InquiryItem[];
  addToInquiry: (item: InquiryItem) => void;
  removeFromInquiry: (productId: string) => void;
  updateInquiryQuantity: (productId: string, quantityMT: number) => void;
  clearInquiry: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProductModal: FruitProduct | null;
  setSelectedProductModal: (product: FruitProduct | null) => void;
  formatPrice: (priceInUSD: number) => string;
  currentCurrencySymbol: string;
  currentCurrencyRate: number;
  totalInquiryMT: number;
  containerLoadPercent: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  openCalculatorWithProduct: (productId: string) => void;
  calculatorTargetFruit: string;
  setCalculatorTargetFruit: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<string>('USD');
  const [unit, setUnit] = useState<'MT' | 'Boxes' | 'KG'>('MT');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProductModal, setSelectedProductModal] = useState<FruitProduct | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [calculatorTargetFruit, setCalculatorTargetFruit] = useState<string>(FRUIT_PRODUCTS[0].id);

  // Initial demo items in inquiry basket so users can immediately see volume calculation!
  const [inquiryItems, setInquiryItems] = useState<InquiryItem[]>([
    {
      product: FRUIT_PRODUCTS[0], // Alphonso Mango
      quantityMT: 4.0,
      packagingName: FRUIT_PRODUCTS[0].packagingTypes[0].name,
      transportMode: 'Air Freight Express'
    },
    {
      product: FRUIT_PRODUCTS[1], // Hass Avocado
      quantityMT: 8.5,
      packagingName: FRUIT_PRODUCTS[1].packagingTypes[0].name,
      transportMode: 'Ocean Reefer (40ft HC)'
    }
  ]);

  const activeCurrencyObj = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  const formatPrice = (priceInUSD: number) => {
    const converted = priceInUSD * activeCurrencyObj.rate;
    return `${activeCurrencyObj.symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const addToInquiry = (newItem: InquiryItem) => {
    setInquiryItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.product.id === newItem.product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantityMT = Number(
          (updated[existingIdx].quantityMT + newItem.quantityMT).toFixed(1)
        );
        return updated;
      }
      return [...prev, newItem];
    });
    showToast(`Added ${newItem.quantityMT} MT of ${newItem.product.name} to Quote Basket!`);
  };

  const removeFromInquiry = (productId: string) => {
    setInquiryItems((prev) => prev.filter((i) => i.product.id !== productId));
    showToast('Removed item from inquiry consignment.');
  };

  const updateInquiryQuantity = (productId: string, quantityMT: number) => {
    if (quantityMT <= 0) {
      removeFromInquiry(productId);
      return;
    }
    setInquiryItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantityMT } : i))
    );
  };

  const clearInquiry = () => {
    setInquiryItems([]);
    showToast('Inquiry consignment cleared.');
  };

  const totalInquiryMT = inquiryItems.reduce((acc, curr) => acc + curr.quantityMT, 0);
  // Standard 40ft High Cube container capacity ~ 21 Metric Tons
  const containerLoadPercent = Math.min(100, Math.round((totalInquiryMT / 21) * 100));

  const openCalculatorWithProduct = (productId: string) => {
    setCalculatorTargetFruit(productId);
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        unit,
        setUnit,
        inquiryItems,
        addToInquiry,
        removeFromInquiry,
        updateInquiryQuantity,
        clearInquiry,
        isCartOpen,
        setIsCartOpen,
        selectedProductModal,
        setSelectedProductModal,
        formatPrice,
        currentCurrencySymbol: activeCurrencyObj.symbol,
        currentCurrencyRate: activeCurrencyObj.rate,
        totalInquiryMT,
        containerLoadPercent,
        toastMessage,
        showToast,
        openCalculatorWithProduct,
        calculatorTargetFruit,
        setCalculatorTargetFruit
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
