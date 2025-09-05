/**
 * North and South American countries data for database seeding
 */

import { CountryData } from "./countries-data";

export const americasCountriesData: CountryData[] = [
  // North America
  {
    code: "CAN",
    continent: "North America",
    region: "Northern America",
    isActive: true,
    translations: [
      { locale: "en", name: "Canada", description: "Canada" },
      { locale: "ar", name: "كندا", description: "كندا" },
      { locale: "es", name: "Canadá", description: "Canadá" },
      { locale: "fr", name: "Canada", description: "Canada" },
    ],
  },
  {
    code: "MEX",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      { locale: "en", name: "Mexico", description: "United Mexican States" },
      {
        locale: "ar",
        name: "المكسيك",
        description: "الولايات المكسيكية المتحدة",
      },
      { locale: "es", name: "México", description: "Estados Unidos Mexicanos" },
      { locale: "fr", name: "Mexique", description: "États-Unis mexicains" },
    ],
  },
  {
    code: "USA",
    continent: "North America",
    region: "Northern America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "United States",
        description: "United States of America",
      },
      {
        locale: "ar",
        name: "الولايات المتحدة",
        description: "الولايات المتحدة الأمريكية",
      },
      {
        locale: "es",
        name: "Estados Unidos",
        description: "Estados Unidos de América",
      },
      {
        locale: "fr",
        name: "États-Unis",
        description: "États-Unis d'Amérique",
      },
    ],
  },

  // Central America
  {
    code: "BLZ",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      { locale: "en", name: "Belize", description: "Belize" },
      { locale: "ar", name: "بليز", description: "بليز" },
      { locale: "es", name: "Belice", description: "Belice" },
      { locale: "fr", name: "Belize", description: "Belize" },
    ],
  },
  {
    code: "CRI",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Costa Rica",
        description: "Republic of Costa Rica",
      },
      { locale: "ar", name: "كوستاريكا", description: "جمهورية كوستاريكا" },
      {
        locale: "es",
        name: "Costa Rica",
        description: "República de Costa Rica",
      },
      {
        locale: "fr",
        name: "Costa Rica",
        description: "République du Costa Rica",
      },
    ],
  },
  {
    code: "SLV",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "El Salvador",
        description: "Republic of El Salvador",
      },
      { locale: "ar", name: "السلفادور", description: "جمهورية السلفادور" },
      {
        locale: "es",
        name: "El Salvador",
        description: "República de El Salvador",
      },
      { locale: "fr", name: "Salvador", description: "République du Salvador" },
    ],
  },
  {
    code: "GTM",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      { locale: "en", name: "Guatemala", description: "Republic of Guatemala" },
      { locale: "ar", name: "غواتيمالا", description: "جمهورية غواتيمالا" },
      {
        locale: "es",
        name: "Guatemala",
        description: "República de Guatemala",
      },
      {
        locale: "fr",
        name: "Guatemala",
        description: "République du Guatemala",
      },
    ],
  },
  {
    code: "HND",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      { locale: "en", name: "Honduras", description: "Republic of Honduras" },
      { locale: "ar", name: "هندوراس", description: "جمهورية هندوراس" },
      { locale: "es", name: "Honduras", description: "República de Honduras" },
      { locale: "fr", name: "Honduras", description: "République du Honduras" },
    ],
  },
  {
    code: "NIC",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      { locale: "en", name: "Nicaragua", description: "Republic of Nicaragua" },
      { locale: "ar", name: "نيكاراغوا", description: "جمهورية نيكاراغوا" },
      {
        locale: "es",
        name: "Nicaragua",
        description: "República de Nicaragua",
      },
      {
        locale: "fr",
        name: "Nicaragua",
        description: "République du Nicaragua",
      },
    ],
  },
  {
    code: "PAN",
    continent: "North America",
    region: "Central America",
    isActive: true,
    translations: [
      { locale: "en", name: "Panama", description: "Republic of Panama" },
      { locale: "ar", name: "بنما", description: "جمهورية بنما" },
      { locale: "es", name: "Panamá", description: "República de Panamá" },
      { locale: "fr", name: "Panama", description: "République du Panama" },
    ],
  },

  // Caribbean
  {
    code: "ATG",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Antigua and Barbuda",
        description: "Antigua and Barbuda",
      },
      {
        locale: "ar",
        name: "أنتيغوا وباربودا",
        description: "أنتيغوا وباربودا",
      },
      {
        locale: "es",
        name: "Antigua y Barbuda",
        description: "Antigua y Barbuda",
      },
      {
        locale: "fr",
        name: "Antigua-et-Barbuda",
        description: "Antigua-et-Barbuda",
      },
    ],
  },
  {
    code: "BHS",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Bahamas",
        description: "Commonwealth of the Bahamas",
      },
      { locale: "ar", name: "الباهاما", description: "كومنولث الباهاما" },
      {
        locale: "es",
        name: "Bahamas",
        description: "Commonwealth de las Bahamas",
      },
      {
        locale: "fr",
        name: "Bahamas",
        description: "Commonwealth des Bahamas",
      },
    ],
  },
  {
    code: "BRB",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      { locale: "en", name: "Barbados", description: "Barbados" },
      { locale: "ar", name: "بربادوس", description: "بربادوس" },
      { locale: "es", name: "Barbados", description: "Barbados" },
      { locale: "fr", name: "Barbade", description: "Barbade" },
    ],
  },
  {
    code: "CUB",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      { locale: "en", name: "Cuba", description: "Republic of Cuba" },
      { locale: "ar", name: "كوبا", description: "جمهورية كوبا" },
      { locale: "es", name: "Cuba", description: "República de Cuba" },
      { locale: "fr", name: "Cuba", description: "République de Cuba" },
    ],
  },
  {
    code: "DMA",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Dominica",
        description: "Commonwealth of Dominica",
      },
      { locale: "ar", name: "دومينيكا", description: "كومنولث دومينيكا" },
      {
        locale: "es",
        name: "Dominica",
        description: "Commonwealth de Dominica",
      },
      {
        locale: "fr",
        name: "Dominique",
        description: "Commonwealth de Dominique",
      },
    ],
  },
  {
    code: "DOM",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Dominican Republic",
        description: "Dominican Republic",
      },
      {
        locale: "ar",
        name: "جمهورية الدومينيكان",
        description: "جمهورية الدومينيكان",
      },
      {
        locale: "es",
        name: "República Dominicana",
        description: "República Dominicana",
      },
      {
        locale: "fr",
        name: "République dominicaine",
        description: "République dominicaine",
      },
    ],
  },
  {
    code: "GRD",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      { locale: "en", name: "Grenada", description: "Grenada" },
      { locale: "ar", name: "غرينادا", description: "غرينادا" },
      { locale: "es", name: "Granada", description: "Granada" },
      { locale: "fr", name: "Grenade", description: "Grenade" },
    ],
  },
  {
    code: "HTI",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      { locale: "en", name: "Haiti", description: "Republic of Haiti" },
      { locale: "ar", name: "هايتي", description: "جمهورية هايتي" },
      { locale: "es", name: "Haití", description: "República de Haití" },
      { locale: "fr", name: "Haïti", description: "République d'Haïti" },
    ],
  },
  {
    code: "JAM",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      { locale: "en", name: "Jamaica", description: "Jamaica" },
      { locale: "ar", name: "جامايكا", description: "جامايكا" },
      { locale: "es", name: "Jamaica", description: "Jamaica" },
      { locale: "fr", name: "Jamaïque", description: "Jamaïque" },
    ],
  },
  {
    code: "KNA",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Saint Kitts and Nevis",
        description: "Federation of Saint Kitts and Nevis",
      },
      {
        locale: "ar",
        name: "سانت كيتس ونيفيس",
        description: "اتحاد سانت كيتس ونيفيس",
      },
      {
        locale: "es",
        name: "San Cristóbal y Nieves",
        description: "Federación de San Cristóbal y Nieves",
      },
      {
        locale: "fr",
        name: "Saint-Kitts-et-Nevis",
        description: "Fédération de Saint-Kitts-et-Nevis",
      },
    ],
  },
  {
    code: "LCA",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      { locale: "en", name: "Saint Lucia", description: "Saint Lucia" },
      { locale: "ar", name: "سانت لوسيا", description: "سانت لوسيا" },
      { locale: "es", name: "Santa Lucía", description: "Santa Lucía" },
      { locale: "fr", name: "Sainte-Lucie", description: "Sainte-Lucie" },
    ],
  },
  {
    code: "VCT",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Saint Vincent and the Grenadines",
        description: "Saint Vincent and the Grenadines",
      },
      {
        locale: "ar",
        name: "سانت فنسنت والغرينادين",
        description: "سانت فنسنت والغرينادين",
      },
      {
        locale: "es",
        name: "San Vicente y las Granadinas",
        description: "San Vicente y las Granadinas",
      },
      {
        locale: "fr",
        name: "Saint-Vincent-et-les-Grenadines",
        description: "Saint-Vincent-et-les-Grenadines",
      },
    ],
  },
  {
    code: "TTO",
    continent: "North America",
    region: "Caribbean",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Trinidad and Tobago",
        description: "Republic of Trinidad and Tobago",
      },
      {
        locale: "ar",
        name: "ترينيداد وتوباغو",
        description: "جمهورية ترينيداد وتوباغو",
      },
      {
        locale: "es",
        name: "Trinidad y Tobago",
        description: "República de Trinidad y Tobago",
      },
      {
        locale: "fr",
        name: "Trinité-et-Tobago",
        description: "République de Trinité-et-Tobago",
      },
    ],
  },

  // South America
  {
    code: "ARG",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Argentina", description: "Argentine Republic" },
      { locale: "ar", name: "الأرجنتين", description: "جمهورية الأرجنتين" },
      { locale: "es", name: "Argentina", description: "República Argentina" },
      { locale: "fr", name: "Argentine", description: "République argentine" },
    ],
  },
  {
    code: "BOL",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Bolivia",
        description: "Plurinational State of Bolivia",
      },
      {
        locale: "ar",
        name: "بوليفيا",
        description: "دولة بوليفيا المتعددة القوميات",
      },
      {
        locale: "es",
        name: "Bolivia",
        description: "Estado Plurinacional de Bolivia",
      },
      {
        locale: "fr",
        name: "Bolivie",
        description: "État plurinational de Bolivie",
      },
    ],
  },
  {
    code: "BRA",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Brazil",
        description: "Federative Republic of Brazil",
      },
      {
        locale: "ar",
        name: "البرازيل",
        description: "جمهورية البرازيل الاتحادية",
      },
      {
        locale: "es",
        name: "Brasil",
        description: "República Federativa del Brasil",
      },
      {
        locale: "fr",
        name: "Brésil",
        description: "République fédérative du Brésil",
      },
    ],
  },
  {
    code: "CHL",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Chile", description: "Republic of Chile" },
      { locale: "ar", name: "تشيلي", description: "جمهورية تشيلي" },
      { locale: "es", name: "Chile", description: "República de Chile" },
      { locale: "fr", name: "Chili", description: "République du Chili" },
    ],
  },
  {
    code: "COL",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Colombia", description: "Republic of Colombia" },
      { locale: "ar", name: "كولومبيا", description: "جمهورية كولومبيا" },
      { locale: "es", name: "Colombia", description: "República de Colombia" },
      { locale: "fr", name: "Colombie", description: "République de Colombie" },
    ],
  },
  {
    code: "ECU",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Ecuador", description: "Republic of Ecuador" },
      { locale: "ar", name: "الإكوادور", description: "جمهورية الإكوادور" },
      { locale: "es", name: "Ecuador", description: "República del Ecuador" },
      {
        locale: "fr",
        name: "Équateur",
        description: "République de l'Équateur",
      },
    ],
  },
  {
    code: "GUY",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Guyana",
        description: "Co-operative Republic of Guyana",
      },
      { locale: "ar", name: "غيانا", description: "جمهورية غيانا التعاونية" },
      {
        locale: "es",
        name: "Guyana",
        description: "República Cooperativa de Guyana",
      },
      {
        locale: "fr",
        name: "Guyana",
        description: "République coopérative du Guyana",
      },
    ],
  },
  {
    code: "PRY",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Paraguay", description: "Republic of Paraguay" },
      { locale: "ar", name: "باراغواي", description: "جمهورية باراغواي" },
      { locale: "es", name: "Paraguay", description: "República del Paraguay" },
      { locale: "fr", name: "Paraguay", description: "République du Paraguay" },
    ],
  },
  {
    code: "PER",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Peru", description: "Republic of Peru" },
      { locale: "ar", name: "بيرو", description: "جمهورية بيرو" },
      { locale: "es", name: "Perú", description: "República del Perú" },
      { locale: "fr", name: "Pérou", description: "République du Pérou" },
    ],
  },
  {
    code: "SUR",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      { locale: "en", name: "Suriname", description: "Republic of Suriname" },
      { locale: "ar", name: "سورينام", description: "جمهورية سورينام" },
      { locale: "es", name: "Surinam", description: "República de Surinam" },
      { locale: "fr", name: "Suriname", description: "République du Suriname" },
    ],
  },
  {
    code: "URY",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Uruguay",
        description: "Oriental Republic of Uruguay",
      },
      {
        locale: "ar",
        name: "أوروغواي",
        description: "جمهورية أوروغواي الشرقية",
      },
      {
        locale: "es",
        name: "Uruguay",
        description: "República Oriental del Uruguay",
      },
      {
        locale: "fr",
        name: "Uruguay",
        description: "République orientale de l'Uruguay",
      },
    ],
  },
  {
    code: "VEN",
    continent: "South America",
    region: "South America",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Venezuela",
        description: "Bolivarian Republic of Venezuela",
      },
      {
        locale: "ar",
        name: "فنزويلا",
        description: "جمهورية فنزويلا البوليفارية",
      },
      {
        locale: "es",
        name: "Venezuela",
        description: "República Bolivariana de Venezuela",
      },
      {
        locale: "fr",
        name: "Venezuela",
        description: "République bolivarienne du Venezuela",
      },
    ],
  },
];
