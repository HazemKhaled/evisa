/**
 * Comprehensive list of all world countries with ISO 3166-1 alpha-3 codes
 * Includes continent and region information for database seeding
 */

export interface CountryData {
  code: string; // ISO 3166-1 alpha-3
  continent: string;
  region: string;
  isActive: boolean;
  translations: {
    locale: string;
    name: string;
    description: string;
  }[];
}

export const allCountriesData: CountryData[] = [
  // Africa
  {
    code: "DZA",
    continent: "Africa",
    region: "Northern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Algeria",
        description: "People's Democratic Republic of Algeria",
      },
      {
        locale: "ar",
        name: "الجزائر",
        description: "الجمهورية الجزائرية الديمقراطية الشعبية",
      },
      {
        locale: "es",
        name: "Argelia",
        description: "República Argelina Democrática y Popular",
      },
      {
        locale: "fr",
        name: "Algérie",
        description: "République algérienne démocratique et populaire",
      },
    ],
  },
  {
    code: "AGO",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Angola", description: "Republic of Angola" },
      { locale: "ar", name: "أنغولا", description: "جمهورية أنغولا" },
      { locale: "es", name: "Angola", description: "República de Angola" },
      { locale: "fr", name: "Angola", description: "République d'Angola" },
    ],
  },
  {
    code: "BEN",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Benin", description: "Republic of Benin" },
      { locale: "ar", name: "بنين", description: "جمهورية بنين" },
      { locale: "es", name: "Benín", description: "República de Benín" },
      { locale: "fr", name: "Bénin", description: "République du Bénin" },
    ],
  },
  {
    code: "BWA",
    continent: "Africa",
    region: "Southern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Botswana", description: "Republic of Botswana" },
      { locale: "ar", name: "بوتسوانا", description: "جمهورية بوتسوانا" },
      { locale: "es", name: "Botsuana", description: "República de Botsuana" },
      { locale: "fr", name: "Botswana", description: "République du Botswana" },
    ],
  },
  {
    code: "BFA",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Burkina Faso", description: "Burkina Faso" },
      { locale: "ar", name: "بوركينا فاسو", description: "بوركينا فاسو" },
      { locale: "es", name: "Burkina Faso", description: "Burkina Faso" },
      { locale: "fr", name: "Burkina Faso", description: "Burkina Faso" },
    ],
  },
  {
    code: "BDI",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Burundi", description: "Republic of Burundi" },
      { locale: "ar", name: "بوروندي", description: "جمهورية بوروندي" },
      { locale: "es", name: "Burundi", description: "República de Burundi" },
      { locale: "fr", name: "Burundi", description: "République du Burundi" },
    ],
  },
  {
    code: "CMR",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Cameroon", description: "Republic of Cameroon" },
      { locale: "ar", name: "الكاميرون", description: "جمهورية الكاميرون" },
      { locale: "es", name: "Camerún", description: "República de Camerún" },
      { locale: "fr", name: "Cameroun", description: "République du Cameroun" },
    ],
  },
  {
    code: "CPV",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Cape Verde",
        description: "Republic of Cabo Verde",
      },
      {
        locale: "ar",
        name: "الرأس الأخضر",
        description: "جمهورية الرأس الأخضر",
      },
      {
        locale: "es",
        name: "Cabo Verde",
        description: "República de Cabo Verde",
      },
      { locale: "fr", name: "Cap-Vert", description: "République du Cap-Vert" },
    ],
  },
  {
    code: "CAF",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Central African Republic",
        description: "Central African Republic",
      },
      {
        locale: "ar",
        name: "جمهورية أفريقيا الوسطى",
        description: "جمهورية أفريقيا الوسطى",
      },
      {
        locale: "es",
        name: "República Centroafricana",
        description: "República Centroafricana",
      },
      {
        locale: "fr",
        name: "République centrafricaine",
        description: "République centrafricaine",
      },
    ],
  },
  {
    code: "TCD",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Chad", description: "Republic of Chad" },
      { locale: "ar", name: "تشاد", description: "جمهورية تشاد" },
      { locale: "es", name: "Chad", description: "República del Chad" },
      { locale: "fr", name: "Tchad", description: "République du Tchad" },
    ],
  },
  {
    code: "COM",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Comoros", description: "Union of the Comoros" },
      { locale: "ar", name: "جزر القمر", description: "اتحاد جزر القمر" },
      { locale: "es", name: "Comoras", description: "Unión de las Comoras" },
      { locale: "fr", name: "Comores", description: "Union des Comores" },
    ],
  },
  {
    code: "COG",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Congo", description: "Republic of the Congo" },
      { locale: "ar", name: "الكونغو", description: "جمهورية الكونغو" },
      { locale: "es", name: "Congo", description: "República del Congo" },
      { locale: "fr", name: "Congo", description: "République du Congo" },
    ],
  },
  {
    code: "COD",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Democratic Republic of the Congo",
        description: "Democratic Republic of the Congo",
      },
      {
        locale: "ar",
        name: "جمهورية الكونغو الديمقراطية",
        description: "جمهورية الكونغو الديمقراطية",
      },
      {
        locale: "es",
        name: "República Democrática del Congo",
        description: "República Democrática del Congo",
      },
      {
        locale: "fr",
        name: "République démocratique du Congo",
        description: "République démocratique du Congo",
      },
    ],
  },
  {
    code: "CIV",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Côte d'Ivoire",
        description: "Republic of Côte d'Ivoire",
      },
      { locale: "ar", name: "ساحل العاج", description: "جمهورية ساحل العاج" },
      {
        locale: "es",
        name: "Costa de Marfil",
        description: "República de Côte d'Ivoire",
      },
      {
        locale: "fr",
        name: "Côte d'Ivoire",
        description: "République de Côte d'Ivoire",
      },
    ],
  },
  {
    code: "DJI",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Djibouti", description: "Republic of Djibouti" },
      { locale: "ar", name: "جيبوتي", description: "جمهورية جيبوتي" },
      { locale: "es", name: "Yibuti", description: "República de Yibuti" },
      { locale: "fr", name: "Djibouti", description: "République de Djibouti" },
    ],
  },
  {
    code: "EGY",
    continent: "Africa",
    region: "Northern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Egypt", description: "Arab Republic of Egypt" },
      { locale: "ar", name: "مصر", description: "جمهورية مصر العربية" },
      {
        locale: "es",
        name: "Egipto",
        description: "República Árabe de Egipto",
      },
      {
        locale: "fr",
        name: "Égypte",
        description: "République arabe d'Égypte",
      },
    ],
  },
  {
    code: "GNQ",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Equatorial Guinea",
        description: "Republic of Equatorial Guinea",
      },
      {
        locale: "ar",
        name: "غينيا الاستوائية",
        description: "جمهورية غينيا الاستوائية",
      },
      {
        locale: "es",
        name: "Guinea Ecuatorial",
        description: "República de Guinea Ecuatorial",
      },
      {
        locale: "fr",
        name: "Guinée équatoriale",
        description: "République de Guinée équatoriale",
      },
    ],
  },
  {
    code: "ERI",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Eritrea", description: "State of Eritrea" },
      { locale: "ar", name: "إريتريا", description: "دولة إريتريا" },
      { locale: "es", name: "Eritrea", description: "Estado de Eritrea" },
      { locale: "fr", name: "Érythrée", description: "État d'Érythrée" },
    ],
  },
  {
    code: "SWZ",
    continent: "Africa",
    region: "Southern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Eswatini", description: "Kingdom of Eswatini" },
      { locale: "ar", name: "إسواتيني", description: "مملكة إسواتيني" },
      { locale: "es", name: "Esuatini", description: "Reino de Esuatini" },
      { locale: "fr", name: "Eswatini", description: "Royaume d'Eswatini" },
    ],
  },
  {
    code: "ETH",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Ethiopia",
        description: "Federal Democratic Republic of Ethiopia",
      },
      {
        locale: "ar",
        name: "إثيوبيا",
        description: "جمهورية إثيوبيا الفيدرالية الديمقراطية",
      },
      {
        locale: "es",
        name: "Etiopía",
        description: "República Democrática Federal de Etiopía",
      },
      {
        locale: "fr",
        name: "Éthiopie",
        description: "République fédérale démocratique d'Éthiopie",
      },
    ],
  },
  {
    code: "GAB",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Gabon", description: "Gabonese Republic" },
      { locale: "ar", name: "الغابون", description: "جمهورية الغابون" },
      { locale: "es", name: "Gabón", description: "República Gabonesa" },
      { locale: "fr", name: "Gabon", description: "République gabonaise" },
    ],
  },
  {
    code: "GMB",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Gambia", description: "Republic of the Gambia" },
      { locale: "ar", name: "غامبيا", description: "جمهورية غامبيا" },
      { locale: "es", name: "Gambia", description: "República de Gambia" },
      { locale: "fr", name: "Gambie", description: "République de Gambie" },
    ],
  },
  {
    code: "GHA",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Ghana", description: "Republic of Ghana" },
      { locale: "ar", name: "غانا", description: "جمهورية غانا" },
      { locale: "es", name: "Ghana", description: "República de Ghana" },
      { locale: "fr", name: "Ghana", description: "République du Ghana" },
    ],
  },
  {
    code: "GIN",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Guinea", description: "Republic of Guinea" },
      { locale: "ar", name: "غينيا", description: "جمهورية غينيا" },
      { locale: "es", name: "Guinea", description: "República de Guinea" },
      { locale: "fr", name: "Guinée", description: "République de Guinée" },
    ],
  },
  {
    code: "GNB",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Guinea-Bissau",
        description: "Republic of Guinea-Bissau",
      },
      { locale: "ar", name: "غينيا بيساو", description: "جمهورية غينيا بيساو" },
      {
        locale: "es",
        name: "Guinea-Bisáu",
        description: "República de Guinea-Bisáu",
      },
      {
        locale: "fr",
        name: "Guinée-Bissau",
        description: "République de Guinée-Bissau",
      },
    ],
  },
  {
    code: "KEN",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Kenya", description: "Republic of Kenya" },
      { locale: "ar", name: "كينيا", description: "جمهورية كينيا" },
      { locale: "es", name: "Kenia", description: "República de Kenia" },
      { locale: "fr", name: "Kenya", description: "République du Kenya" },
    ],
  },
  {
    code: "LSO",
    continent: "Africa",
    region: "Southern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Lesotho", description: "Kingdom of Lesotho" },
      { locale: "ar", name: "ليسوتو", description: "مملكة ليسوتو" },
      { locale: "es", name: "Lesoto", description: "Reino de Lesoto" },
      { locale: "fr", name: "Lesotho", description: "Royaume du Lesotho" },
    ],
  },
  {
    code: "LBR",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Liberia", description: "Republic of Liberia" },
      { locale: "ar", name: "ليبيريا", description: "جمهورية ليبيريا" },
      { locale: "es", name: "Liberia", description: "República de Liberia" },
      { locale: "fr", name: "Libéria", description: "République du Libéria" },
    ],
  },
  {
    code: "LBY",
    continent: "Africa",
    region: "Northern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Libya", description: "State of Libya" },
      { locale: "ar", name: "ليبيا", description: "دولة ليبيا" },
      { locale: "es", name: "Libia", description: "Estado de Libia" },
      { locale: "fr", name: "Libye", description: "État de Libye" },
    ],
  },
  {
    code: "MDG",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Madagascar",
        description: "Republic of Madagascar",
      },
      { locale: "ar", name: "مدغشقر", description: "جمهورية مدغشقر" },
      {
        locale: "es",
        name: "Madagascar",
        description: "República de Madagascar",
      },
      {
        locale: "fr",
        name: "Madagascar",
        description: "République de Madagascar",
      },
    ],
  },
  {
    code: "MWI",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Malawi", description: "Republic of Malawi" },
      { locale: "ar", name: "مالاوي", description: "جمهورية مالاوي" },
      { locale: "es", name: "Malaui", description: "República de Malaui" },
      { locale: "fr", name: "Malawi", description: "République du Malawi" },
    ],
  },
  {
    code: "MLI",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Mali", description: "Republic of Mali" },
      { locale: "ar", name: "مالي", description: "جمهورية مالي" },
      { locale: "es", name: "Malí", description: "República de Malí" },
      { locale: "fr", name: "Mali", description: "République du Mali" },
    ],
  },
  {
    code: "MRT",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Mauritania",
        description: "Islamic Republic of Mauritania",
      },
      {
        locale: "ar",
        name: "موريتانيا",
        description: "الجمهورية الإسلامية الموريتانية",
      },
      {
        locale: "es",
        name: "Mauritania",
        description: "República Islámica de Mauritania",
      },
      {
        locale: "fr",
        name: "Mauritanie",
        description: "République islamique de Mauritanie",
      },
    ],
  },
  {
    code: "MUS",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Mauritius", description: "Republic of Mauritius" },
      { locale: "ar", name: "موريشيوس", description: "جمهورية موريشيوس" },
      { locale: "es", name: "Mauricio", description: "República de Mauricio" },
      { locale: "fr", name: "Maurice", description: "République de Maurice" },
    ],
  },
  {
    code: "MAR",
    continent: "Africa",
    region: "Northern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Morocco", description: "Kingdom of Morocco" },
      { locale: "ar", name: "المغرب", description: "المملكة المغربية" },
      { locale: "es", name: "Marruecos", description: "Reino de Marruecos" },
      { locale: "fr", name: "Maroc", description: "Royaume du Maroc" },
    ],
  },
  {
    code: "MOZ",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Mozambique",
        description: "Republic of Mozambique",
      },
      { locale: "ar", name: "موزمبيق", description: "جمهورية موزمبيق" },
      {
        locale: "es",
        name: "Mozambique",
        description: "República de Mozambique",
      },
      {
        locale: "fr",
        name: "Mozambique",
        description: "République du Mozambique",
      },
    ],
  },
  {
    code: "NAM",
    continent: "Africa",
    region: "Southern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Namibia", description: "Republic of Namibia" },
      { locale: "ar", name: "ناميبيا", description: "جمهورية ناميبيا" },
      { locale: "es", name: "Namibia", description: "República de Namibia" },
      { locale: "fr", name: "Namibie", description: "République de Namibie" },
    ],
  },
  {
    code: "NER",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Niger", description: "Republic of the Niger" },
      { locale: "ar", name: "النيجر", description: "جمهورية النيجر" },
      { locale: "es", name: "Níger", description: "República del Níger" },
      { locale: "fr", name: "Niger", description: "République du Niger" },
    ],
  },
  {
    code: "NGA",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Nigeria",
        description: "Federal Republic of Nigeria",
      },
      {
        locale: "ar",
        name: "نيجيريا",
        description: "جمهورية نيجيريا الاتحادية",
      },
      {
        locale: "es",
        name: "Nigeria",
        description: "República Federal de Nigeria",
      },
      {
        locale: "fr",
        name: "Nigéria",
        description: "République fédérale du Nigéria",
      },
    ],
  },
  {
    code: "RWA",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Rwanda", description: "Republic of Rwanda" },
      { locale: "ar", name: "رواندا", description: "جمهورية رواندا" },
      { locale: "es", name: "Ruanda", description: "República de Ruanda" },
      { locale: "fr", name: "Rwanda", description: "République du Rwanda" },
    ],
  },
  {
    code: "STP",
    continent: "Africa",
    region: "Middle Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "São Tomé and Príncipe",
        description: "Democratic Republic of São Tomé and Príncipe",
      },
      {
        locale: "ar",
        name: "ساو تومي وبرينسيبي",
        description: "جمهورية ساو تومي وبرينسيبي الديمقراطية",
      },
      {
        locale: "es",
        name: "Santo Tomé y Príncipe",
        description: "República Democrática de Santo Tomé y Príncipe",
      },
      {
        locale: "fr",
        name: "Sao Tomé-et-Principe",
        description: "République démocratique de Sao Tomé-et-Principe",
      },
    ],
  },
  {
    code: "SEN",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Senegal", description: "Republic of Senegal" },
      { locale: "ar", name: "السنغال", description: "جمهورية السنغال" },
      { locale: "es", name: "Senegal", description: "República de Senegal" },
      { locale: "fr", name: "Sénégal", description: "République du Sénégal" },
    ],
  },
  {
    code: "SYC",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Seychelles",
        description: "Republic of Seychelles",
      },
      { locale: "ar", name: "سيشل", description: "جمهورية سيشل" },
      {
        locale: "es",
        name: "Seychelles",
        description: "República de Seychelles",
      },
      {
        locale: "fr",
        name: "Seychelles",
        description: "République des Seychelles",
      },
    ],
  },
  {
    code: "SLE",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Sierra Leone",
        description: "Republic of Sierra Leone",
      },
      { locale: "ar", name: "سيراليون", description: "جمهورية سيراليون" },
      {
        locale: "es",
        name: "Sierra Leona",
        description: "República de Sierra Leona",
      },
      {
        locale: "fr",
        name: "Sierra Leone",
        description: "République de Sierra Leone",
      },
    ],
  },
  {
    code: "SOM",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Somalia",
        description: "Federal Republic of Somalia",
      },
      {
        locale: "ar",
        name: "الصومال",
        description: "جمهورية الصومال الفيدرالية",
      },
      {
        locale: "es",
        name: "Somalia",
        description: "República Federal de Somalia",
      },
      {
        locale: "fr",
        name: "Somalie",
        description: "République fédérale de Somalie",
      },
    ],
  },
  {
    code: "ZAF",
    continent: "Africa",
    region: "Southern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "South Africa",
        description: "Republic of South Africa",
      },
      {
        locale: "ar",
        name: "جنوب أفريقيا",
        description: "جمهورية جنوب أفريقيا",
      },
      {
        locale: "es",
        name: "Sudáfrica",
        description: "República de Sudáfrica",
      },
      {
        locale: "fr",
        name: "Afrique du Sud",
        description: "République d'Afrique du Sud",
      },
    ],
  },
  {
    code: "SSD",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "South Sudan",
        description: "Republic of South Sudan",
      },
      {
        locale: "ar",
        name: "جنوب السودان",
        description: "جمهورية جنوب السودان",
      },
      {
        locale: "es",
        name: "Sudán del Sur",
        description: "República de Sudán del Sur",
      },
      {
        locale: "fr",
        name: "Soudan du Sud",
        description: "République du Soudan du Sud",
      },
    ],
  },
  {
    code: "SDN",
    continent: "Africa",
    region: "Northern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Sudan", description: "Republic of the Sudan" },
      { locale: "ar", name: "السودان", description: "جمهورية السودان" },
      { locale: "es", name: "Sudán", description: "República del Sudán" },
      { locale: "fr", name: "Soudan", description: "République du Soudan" },
    ],
  },
  {
    code: "TZA",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Tanzania",
        description: "United Republic of Tanzania",
      },
      {
        locale: "ar",
        name: "تنزانيا",
        description: "جمهورية تنزانيا الاتحادية",
      },
      {
        locale: "es",
        name: "Tanzania",
        description: "República Unida de Tanzania",
      },
      {
        locale: "fr",
        name: "Tanzanie",
        description: "République unie de Tanzanie",
      },
    ],
  },
  {
    code: "TGO",
    continent: "Africa",
    region: "Western Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Togo", description: "Togolese Republic" },
      { locale: "ar", name: "توغو", description: "جمهورية توغو" },
      { locale: "es", name: "Togo", description: "República Togolesa" },
      { locale: "fr", name: "Togo", description: "République togolaise" },
    ],
  },
  {
    code: "TUN",
    continent: "Africa",
    region: "Northern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Tunisia", description: "Republic of Tunisia" },
      { locale: "ar", name: "تونس", description: "الجمهورية التونسية" },
      { locale: "es", name: "Túnez", description: "República de Túnez" },
      { locale: "fr", name: "Tunisie", description: "République tunisienne" },
    ],
  },
  {
    code: "UGA",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Uganda", description: "Republic of Uganda" },
      { locale: "ar", name: "أوغندا", description: "جمهورية أوغندا" },
      { locale: "es", name: "Uganda", description: "República de Uganda" },
      { locale: "fr", name: "Ouganda", description: "République d'Ouganda" },
    ],
  },
  {
    code: "ZMB",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Zambia", description: "Republic of Zambia" },
      { locale: "ar", name: "زامبيا", description: "جمهورية زامبيا" },
      { locale: "es", name: "Zambia", description: "República de Zambia" },
      { locale: "fr", name: "Zambie", description: "République de Zambie" },
    ],
  },
  {
    code: "ZWE",
    continent: "Africa",
    region: "Eastern Africa",
    isActive: true,
    translations: [
      { locale: "en", name: "Zimbabwe", description: "Republic of Zimbabwe" },
      { locale: "ar", name: "زيمبابوي", description: "جمهورية زيمبابوي" },
      { locale: "es", name: "Zimbabue", description: "República de Zimbabue" },
      { locale: "fr", name: "Zimbabwe", description: "République du Zimbabwe" },
    ],
  },
];
