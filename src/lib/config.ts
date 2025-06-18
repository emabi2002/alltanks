// Company configuration - easily updatable
export const companyConfig = {
  name: "All Tanks Limited",
  tagline: "Built to Last. Engineered for the Tropics.",

  // Contact Information
  contact: {
    phone: "+675 472 2XXX", // Lae area code
    email: "info@alltanks.com.pg",
    website: "www.alltanks.com.pg",

    // Business Hours
    businessHours: {
      weekdays: "Monday - Friday: 8:00 AM - 5:00 PM",
      saturday: "Saturday: 8:00 AM - 12:00 PM",
      sunday: "Sunday: Closed",
      publicHolidays: "Public Holidays: Closed"
    }
  },

  // Primary Location (easily configurable)
  location: {
    city: "Lae",
    province: "Morobe Province",
    country: "Papua New Guinea",

    // Physical Address
    address: {
      street: "Industrial Road",
      suburb: "Malahang",
      city: "Lae",
      province: "Morobe Province",
      postalCode: "411",
      country: "Papua New Guinea"
    },

    // GPS Coordinates for Lae
    coordinates: {
      latitude: -6.7249,
      longitude: 146.9968
    },

    // Mailing Address (if different)
    mailingAddress: {
      poBox: "PO Box 1234",
      city: "Lae",
      province: "Morobe Province",
      postalCode: "411",
      country: "Papua New Guinea"
    }
  },

  // Service Areas
  serviceAreas: [
    "Morobe Province",
    "National Capital District",
    "Western Highlands Province",
    "Southern Highlands Province",
    "Eastern Highlands Province",
    "Madang Province",
    "East New Britain Province",
    "West New Britain Province",
    "All PNG Provinces"
  ],

  // Social Media (when available)
  social: {
    facebook: "", // To be configured later
    linkedin: "", // To be configured later
    instagram: "" // To be configured later
  },

  // Company Details
  company: {
    founded: 1995,
    abn: "XX XXX XXX XXX", // Australian Business Number equivalent
    registration: "All Tanks Limited - PNG Company Registration",

    // Key Statistics
    stats: {
      yearsInBusiness: new Date().getFullYear() - 1995,
      tanksManufactured: "50,000+",
      customersServed: "5,000+",
      provincesServed: 20
    }
  },

  // Quality Certifications
  certifications: [
    "ISO 9001:2015 Quality Management",
    "ISO 14001:2015 Environmental Management",
    "PNG Standards Compliance",
    "Food Grade Certification"
  ]
};

// Helper functions
export const getFullAddress = () => {
  const addr = companyConfig.location.address;
  return `${addr.street}, ${addr.suburb}, ${addr.city}, ${addr.province} ${addr.postalCode}, ${addr.country}`;
};

export const getContactDisplay = () => {
  return {
    phone: companyConfig.contact.phone,
    email: companyConfig.contact.email,
    address: getFullAddress(),
    hours: companyConfig.contact.businessHours
  };
};

export const getMapUrl = () => {
  const coords = companyConfig.location.coordinates;
  return `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
};

export const getDirectionsUrl = () => {
  const coords = companyConfig.location.coordinates;
  return `https://www.google.com/maps/dir/?api=1&destination=${coords.latitude},${coords.longitude}`;
};
