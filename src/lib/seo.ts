// src/lib/seo.ts
import type { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
}

export const baseSEO: SEOConfig = {
  title: "All Tanks Limited - Premium Tank Solutions Papua New Guinea",
  description: "Leading manufacturer of premium polyethylene water tanks, septic tanks, and industrial storage solutions in Papua New Guinea. Built to last, engineered for the tropics. 10-year warranty.",
  keywords: [
    "water tanks Papua New Guinea",
    "polyethylene tanks PNG",
    "septic tanks PNG",
    "industrial tanks Papua New Guinea",
    "tank manufacturer PNG",
    "water storage PNG",
    "All Tanks Limited",
    "Lae tanks",
    "Morobe Province tanks",
    "PNG water storage",
    "cyclone rated tanks",
    "UV stabilized tanks",
    "tank installation PNG",
    "tank delivery PNG",
    "commercial tanks PNG"
  ],
  openGraph: {
    title: "All Tanks Limited - Premium Tank Solutions Papua New Guinea",
    description: "Leading manufacturer of premium polyethylene tanks in Papua New Guinea. Built to last, engineered for the tropics.",
    image: "https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png",
    url: "https://alltanks.com.pg"
  },
  twitter: {
    card: 'summary_large_image',
    title: "All Tanks Limited - Premium Tank Solutions Papua New Guinea",
    description: "Leading manufacturer of premium polyethylene tanks in Papua New Guinea. Built to last, engineered for the tropics.",
    image: "https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png"
  }
};

export const pageSEO = {
  home: {
    title: "All Tanks Limited | Premium Tank Manufacturer Papua New Guinea",
    description: "Leading manufacturer of premium polyethylene water tanks, septic tanks, and industrial storage solutions in Papua New Guinea. UV-stabilized, cyclone-rated. 10-year warranty. Free quote.",
    keywords: [
      ...baseSEO.keywords,
      "tank quote PNG",
      "water tank price PNG",
      "tank manufacturer Lae",
      "PNG tank supplier"
    ]
  },
  products: {
    title: "Tank Products | Water, Septic & Industrial Tanks PNG | All Tanks Limited",
    description: "Browse our complete range of premium polyethylene tanks: water storage tanks, septic systems, chemical tanks, and feed troughs. Made in Papua New Guinea with 10-year warranty.",
    keywords: [
      ...baseSEO.keywords,
      "tank products PNG",
      "water tank sizes PNG",
      "septic tank sizes PNG",
      "industrial tank products",
      "tank catalog PNG"
    ]
  },
  quote: {
    title: "Get Free Tank Quote | Custom Tank Pricing PNG | All Tanks Limited",
    description: "Get instant quote for custom tank solutions in Papua New Guinea. Water tanks, septic tanks, industrial storage. Professional delivery and installation available.",
    keywords: [
      ...baseSEO.keywords,
      "tank quote PNG",
      "custom tank quote",
      "tank pricing PNG",
      "tank installation quote"
    ]
  },
  about: {
    title: "About All Tanks Limited | 29+ Years Tank Manufacturing PNG",
    description: "Since 1995, All Tanks Limited has been Papua New Guinea's leading tank manufacturer. ISO certified, UV-stabilized polyethylene tanks built for tropical conditions.",
    keywords: [
      ...baseSEO.keywords,
      "tank manufacturer history PNG",
      "ISO certified tanks PNG",
      "tank company PNG",
      "Lae tank manufacturer"
    ]
  },
  contact: {
    title: "Contact All Tanks Limited | Tank Experts Lae, PNG",
    description: "Contact All Tanks Limited in Lae, Morobe Province for tank solutions. Professional consultation, quotes, and support. Serving all PNG provinces.",
    keywords: [
      ...baseSEO.keywords,
      "tank contact PNG",
      "tank company Lae",
      "tank support PNG",
      "Morobe Province tanks"
    ]
  }
};

export function generateProductSEO(productName: string, productType: string, capacity: number): Metadata {
  const title = `${productName} | ${capacity}L ${productType} PNG | All Tanks Limited`;
  const description = `Premium ${capacity}L ${productType.toLowerCase()} in Papua New Guinea. UV-stabilized polyethylene construction, 10-year warranty. Professional delivery available.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [baseSEO.openGraph.image],
      url: baseSEO.openGraph.url
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [baseSEO.twitter.image]
    },
    keywords: `${capacity}L ${productType.toLowerCase()} PNG, ${productName} PNG, ${baseSEO.keywords.join(', ')}`
  };
}

export function generateMetadata(page: keyof typeof pageSEO, customConfig?: Partial<SEOConfig>): Metadata {
  const config = pageSEO[page];
  const finalConfig = customConfig ? { ...config, ...customConfig } : config;

  return {
    title: finalConfig.title,
    description: finalConfig.description,
    openGraph: {
      title: finalConfig.title,
      description: finalConfig.description,
      images: [baseSEO.openGraph.image],
      url: baseSEO.openGraph.url
    },
    twitter: {
      card: 'summary_large_image',
      title: finalConfig.title,
      description: finalConfig.description,
      images: [baseSEO.twitter.image]
    },
    keywords: finalConfig.keywords?.join(', '),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: ''
    }
  };
}

export function generateProductStructuredData(product: {
  name: string;
  description: string;
  images: string[];
  price: number;
  capacity: number;
  inStock: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images,
    "brand": {
      "@type": "Brand",
      "name": "All Tanks Limited"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "All Tanks Limited"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "PGK",
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "All Tanks Limited"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Capacity",
        "value": `${product.capacity}L`
      },
      {
        "@type": "PropertyValue",
        "name": "Material",
        "value": "High-Density Polyethylene (HDPE)"
      },
      {
        "@type": "PropertyValue",
        "name": "Warranty",
        "value": "10 years"
      }
    ]
  };
}

export function generateCanonicalUrl(path: string): string {
  return `https://alltanks.com.pg${path}`;
}

export function generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

export const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What types of tanks does All Tanks Limited manufacture?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We manufacture water storage tanks, septic tank systems, industrial chemical storage tanks, and livestock feed troughs. All made from UV-stabilized polyethylene."
      }
    },
    {
      "@type": "Question",
      "name": "Do you deliver tanks throughout Papua New Guinea?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we provide professional delivery services to all provinces in Papua New Guinea. Delivery costs vary by location."
      }
    },
    {
      "@type": "Question",
      "name": "What warranty do you offer on your tanks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All our tanks come with a comprehensive 10-year manufacturer warranty against defects and UV damage."
      }
    },
    {
      "@type": "Question",
      "name": "Can you provide custom tank sizes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we offer custom tank solutions from 100L to 50,000L capacity to meet specific requirements."
      }
    }
  ]
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "All Tanks Limited",
  "alternateName": "All Tanks PNG",
  "url": "https://alltanks.com.pg",
  "logo": "https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png",
  "description": "Leading manufacturer of premium polyethylene tanks in Papua New Guinea since 1995",
  "foundingDate": "1995",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Industrial Road, Malahang",
    "addressLocality": "Lae",
    "addressRegion": "Morobe Province",
    "postalCode": "411",
    "addressCountry": "Papua New Guinea"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+675-472-2XXX",
    "contactType": "customer service",
    "areaServed": "Papua New Guinea",
    "availableLanguage": ["English", "Tok Pisin"]
  },
  "sameAs": [],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tank Products",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Water Storage Tanks",
          "description": "Premium polyethylene water storage tanks"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Septic Tank Systems",
          "description": "Complete wastewater treatment systems"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Industrial Storage Tanks",
          "description": "Chemical and industrial storage solutions"
        }
      }
    ]
  }
};

export const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "All Tanks Limited",
  "image": "https://ugc.same-assets.com/H04JDgOV2iX-fz1euPoKWCGW9cKNqoyr.png",
  "priceRange": "$$",
  "telephone": "+675-472-2XXX",
  "url": "https://alltanks.com.pg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Industrial Road, Malahang",
    "addressLocality": "Lae",
    "addressRegion": "Morobe Province",
    "postalCode": "411",
    "addressCountry": "Papua New Guinea"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -6.7249,
    "longitude": 146.9968
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "08:00",
      "closes": "12:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
};
