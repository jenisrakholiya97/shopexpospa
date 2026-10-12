export type FruitCategory = 'all' | 'tropical' | 'citrus' | 'berries' | 'stone-tree';

export type ExportGrade = 'Grade A Extra' | 'Class 1 Export' | 'Organic Certified';

export type TransportMode = 'Ocean Reefer (40ft HC)' | 'Air Freight Express';

export interface FruitProduct {
  id: string;
  name: string;
  scientificName: string;
  variety: string;
  category: 'tropical' | 'citrus' | 'berries' | 'stone-tree';
  hsCode: string;
  originCountries: string[];
  primaryOrigin: string;
  exportGrade: ExportGrade;
  brixScore: string;
  harvestSeason: string;
  harvestMonths: number[]; // 1-12
  coldChainTemp: string;
  humidity: string;
  controlledAtmosphere: string;
  shelfLifeDays: number;
  minOrderFCL: string; // e.g. "1 x 40ft HC Reefer (~22 MT)"
  minOrderAir: string; // e.g. "500 kg"
  packagingTypes: {
    name: string;
    weightKg: number;
    description: string;
  }[];
  pricePerKgUSD: number;
  boxPriceUSD: number;
  boxWeightKg: number;
  recommendedTransport: TransportMode;
  featured: boolean;
  badge?: string;
  flavorProfile: string;
  colorHex: string;
  palletLoad: string;
  imageUrl: string;
  certifications: string[];
  description: string;
}

export interface DestinationPort {
  id: string;
  name: string;
  country: string;
  region: 'Europe' | 'Middle East' | 'Asia Pacific' | 'North America';
  transitDays: number;
  reeferOceanRatePerFCL: number; // USD for 40ft High Cube
  airFreightPerKg: number; // USD/kg
}

export interface LiveShipment {
  id: string;
  trackingNumber: string;
  vesselName: string;
  productName: string;
  quantityMT: number;
  originPort: string;
  destinationPort: string;
  departureDate: string;
  estimatedArrival: string;
  progressPercent: number;
  status: 'In Transit - Ocean' | 'Customs Clearance' | 'Pre-Cooling Depot' | 'Discharged at Port';
  tempSetPoint: number;
  tempCurrent: number;
  humidityCurrent: number;
  ethylenePpm: number;
  co2Percent: number;
  o2Percent: number;
  powerStatus: 'Normal (Reefer Active)' | 'Generator Backup';
  lastPingTime: string;
}

export interface InquiryItem {
  product: FruitProduct;
  quantityMT: number;
  packagingName: string;
  transportMode: TransportMode;
}

export interface RFQFormState {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  importerTaxId: string;
  destinationPortId: string;
  targetArrivalDate: string;
  incoterm: 'FOB' | 'CIF' | 'CFR' | 'EXW';
  specialRequirements: string;
}
