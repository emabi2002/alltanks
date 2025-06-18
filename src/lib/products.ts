// src/lib/products.ts

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  capacity: number;
  dimensions: {
    diameter: number;
    height: number;
  };
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  colors: string[];
  inStock: boolean;
  leadTime: string;
  isBestSeller?: boolean;
  isNew?: boolean;
}

export const productCategories = [
  {
    id: "water-tanks",
    name: "Water Tanks",
    description: "Premium water storage solutions for residential and commercial use",
    icon: "💧",
  },
  {
    id: "septic-tanks",
    name: "Septic Tanks",
    description: "Complete wastewater treatment systems",
    icon: "🚿",
  },
  {
    id: "chemical-tanks",
    name: "Chemical Tanks",
    description: "Industrial storage for chemicals and hazardous materials",
    icon: "🧪",
  },
  {
    id: "feed-troughs",
    name: "Feed Troughs",
    description: "Livestock feeding solutions",
    icon: "🐄",
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Fittings, valves, and tank accessories",
    icon: "🔧",
  },
];

export const products: Product[] = [
  {
    id: "wt-5000",
    name: "5000L Water Storage Tank",
    category: "water-tanks",
    description: "Our most popular residential water tank, perfect for homes and small businesses. Made from UV-stabilized HDPE with a 10-year warranty.",
    shortDescription: "Perfect for residential homes and small businesses",
    price: 2850,
    capacity: 5000,
    dimensions: {
      diameter: 200,
      height: 240,
    },
    features: [
      "UV-Stabilized HDPE construction",
      "10-year manufacturer warranty",
      "Cyclone-rated design",
      "Food-grade material",
      "Easy installation",
      "Multiple color options",
    ],
    specifications: {
      Material: "High-Density Polyethylene (HDPE)",
      "Wall Thickness": "8mm",
      "Inlet Size": "150mm",
      "Outlet Size": "25mm",
      Weight: "45kg",
      "UV Rating": "Grade 8",
      Warranty: "10 years",
    },
    images: [
      "https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png"
    ],
    colors: ["Blue", "Green", "Black", "Beige"],
    inStock: true,
    leadTime: "3-5 working days",
    isBestSeller: true,
  },
  // Add more products as needed
];

// ✅ Utility functions

export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(product => product.category === categoryId);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return Promise.resolve(products.find(product => product.id === id) || null);
};

export const getAllProducts = async (): Promise<Product[]> => {
  return Promise.resolve(products);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};
