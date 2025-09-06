/**
 * Comprehensive list of all world countries with ISO 3166-1 alpha-3 codes
 * Includes continent and region information for database seeding
 */

export interface CountryData {
  code: string; // ISO 3166-1 alpha-3
  continent: string;
  region: string;
  heroImage: string; // Unsplash or other hero image URL
  isActive: boolean;
  translations: {
    locale: string;
    name: string;
    name_long: string; // Official/formal country name
    about: string; // 2-line catchy description
  }[];
}

export const allCountriesData: CountryData[] = [
  // Africa
  {
    code: "DZA",
    continent: "Africa",
    region: "Northern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop",
    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Algeria",
        name_long: "People's Democratic Republic of Algeria",
        about:
          "Land of ancient Berber heritage and stunning Saharan landscapes. Where Mediterranean coastline meets endless golden dunes.",
      },
      {
        locale: "ar",
        name: "الجزائر",
        name_long: "الجمهورية الجزائرية الديمقراطية الشعبية",
        about:
          "أرض التراث الأمازيغي العريق والمناظر الصحراوية الخلابة. حيث يلتقي الساحل المتوسطي بالكثبان الذهبية اللامتناهية.",
      },
      {
        locale: "es",
        name: "Argelia",
        name_long: "República Argelina Democrática y Popular",
        about:
          "Tierra de antigua herencia bereber y impresionantes paisajes saharianos. Donde la costa mediterránea se encuentra con dunas doradas infinitas.",
      },
      {
        locale: "fr",
        name: "Algérie",
        name_long: "République algérienne démocratique et populaire",
        about:
          "Terre d'héritage berbère ancien et de paysages sahariens époustouflants. Où la côte méditerranéenne rencontre des dunes dorées infinies.",
      },
      {
        locale: "pt",
        name: "Argélia",
        name_long: "República Argelina Democrática e Popular",
        about:
          "Terra de antiga herança berbere e paisagens saharianas deslumbrantes. Onde a costa mediterrânea encontra dunas douradas infinitas.",
      },
      {
        locale: "ru",
        name: "Алжир",
        name_long: "Алжирская Народно-Демократическая Республика",
        about:
          "Земля древнего берберского наследия и потрясающих сахарских пейзажей. Где средиземноморское побережье встречается с бесконечными золотыми дюнами.",
      },
      {
        locale: "de",
        name: "Algerien",
        name_long: "Demokratische Volksrepublik Algerien",
        about:
          "Land des alten Berber-Erbes und atemberaubender Sahara-Landschaften. Wo die Mittelmeerküste auf endlose goldene Dünen trifft.",
      },
      {
        locale: "it",
        name: "Algeria",
        name_long: "Repubblica Algerina Democratica e Popolare",
        about:
          "Terra di antica eredità berbera e paesaggi sahariani mozzafiato. Dove la costa mediterranea incontra dune dorate infinite.",
      },
    ],
  },
  {
    code: "AGO",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Angola",
        name_long: "Republic of Angola",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "أنغولا",
        name_long: "جمهورية أنغولا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Angola",
        name_long: "República de Angola",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Angola",
        name_long: "République d'Angola",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Angola",
        name_long: "República de Angola",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Ангола",
        name_long: "Республика Ангола",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Angola",
        name_long: "Republik Angola",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Angola",
        name_long: "Repubblica dell'Angola",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "BEN",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Benin",
        name_long: "Republic of Benin",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "بنين",
        name_long: "جمهورية بنين",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Benín",
        name_long: "República de Benín",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Bénin",
        name_long: "République du Bénin",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Benin",
        name_long: "República do Benin",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Бенин",
        name_long: "Республика Бенин",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Benin",
        name_long: "Republik Benin",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Benin",
        name_long: "Repubblica del Benin",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "BWA",
    continent: "Africa",
    region: "Southern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Botswana",
        name_long: "Republic of Botswana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "بوتسوانا",
        name_long: "جمهورية بوتسوانا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Botsuana",
        name_long: "República de Botsuana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Botswana",
        name_long: "République du Botswana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Botsuana",
        name_long: "República do Botsuana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Ботсвана",
        name_long: "Республика Ботсвана",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Botswana",
        name_long: "Republik Botswana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Botswana",
        name_long: "Repubblica del Botswana",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "BFA",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Burkina Faso",
        name_long: "Burkina Faso",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "بوركينا فاسو",
        name_long: "بوركينا فاسو",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Burkina Faso",
        name_long: "Burkina Faso",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Burkina Faso",
        name_long: "Burkina Faso",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Burkina Faso",
        name_long: "Burkina Faso",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Буркина-Фасо",
        name_long: "Буркина-Фасо",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Burkina Faso",
        name_long: "Burkina Faso",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Burkina Faso",
        name_long: "Burkina Faso",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "BDI",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Burundi",
        name_long: "Republic of Burundi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "بوروندي",
        name_long: "جمهورية بوروندي",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Burundi",
        name_long: "República de Burundi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Burundi",
        name_long: "République du Burundi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Burundi",
        name_long: "República do Burundi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Бурунди",
        name_long: "Республика Бурунди",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Burundi",
        name_long: "Republik Burundi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Burundi",
        name_long: "Repubblica del Burundi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "CMR",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Cameroon",
        name_long: "Republic of Cameroon",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "الكاميرون",
        name_long: "جمهورية الكاميرون",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Camerún",
        name_long: "República de Camerún",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Cameroun",
        name_long: "République du Cameroun",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Camarões",
        name_long: "República dos Camarões",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Камерун",
        name_long: "Республика Камерун",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Kamerun",
        name_long: "Republik Kamerun",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Camerun",
        name_long: "Repubblica del Camerun",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "CPV",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Cape Verde",
        name_long: "Republic of Cabo Verde",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "الرأس الأخضر",
        name_long: "جمهورية الرأس الأخضر",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Cabo Verde",
        name_long: "República de Cabo Verde",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Cap-Vert",
        name_long: "République du Cap-Vert",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Cabo Verde",
        name_long: "República de Cabo Verde",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Кабо-Верде",
        name_long: "Республика Кабо-Верде",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Kap Verde",
        name_long: "Republik Kap Verde",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Capo Verde",
        name_long: "Repubblica di Capo Verde",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "CAF",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Central African Republic",
        name_long: "Central African Republic",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "جمهورية أفريقيا الوسطى",
        name_long: "جمهورية أفريقيا الوسطى",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "República Centroafricana",
        name_long: "República Centroafricana",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "République centrafricaine",
        name_long: "République centrafricaine",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "República Centro-Africana",
        name_long: "República Centro-Africana",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Центральноафриканская Республика",
        name_long: "Центральноафриканская Республика",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Zentralafrikanische Republik",
        name_long: "Zentralafrikanische Republik",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Repubblica Centrafricana",
        name_long: "Repubblica Centrafricana",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "TCD",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Chad",
        name_long: "Republic of Chad",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "تشاد",
        name_long: "جمهورية تشاد",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Chad",
        name_long: "República del Chad",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Tchad",
        name_long: "République du Tchad",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Chade",
        name_long: "República do Chade",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Чад",
        name_long: "Республика Чад",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Tschad",
        name_long: "Republik Tschad",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Ciad",
        name_long: "Repubblica del Ciad",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "COM",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Comoros",
        name_long: "Union of the Comoros",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "جزر القمر",
        name_long: "اتحاد جزر القمر",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Comoras",
        name_long: "Unión de las Comoras",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Comores",
        name_long: "Union des Comores",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Comores",
        name_long: "União das Comores",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Коморы",
        name_long: "Союз Коморских Островов",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Komoren",
        name_long: "Union der Komoren",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Comore",
        name_long: "Unione delle Comore",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "COG",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Congo",
        name_long: "Republic of the Congo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "الكونغو",
        name_long: "جمهورية الكونغو",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Congo",
        name_long: "República del Congo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Congo",
        name_long: "République du Congo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Congo",
        name_long: "República do Congo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Конго",
        name_long: "Республика Конго",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Kongo",
        name_long: "Republik Kongo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Congo",
        name_long: "Repubblica del Congo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "COD",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Democratic Republic of the Congo",
        name_long: "Democratic Republic of the Congo",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "جمهورية الكونغو الديمقراطية",
        name_long: "جمهورية الكونغو الديمقراطية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "República Democrática del Congo",
        name_long: "República Democrática del Congo",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "République démocratique du Congo",
        name_long: "République démocratique du Congo",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "República Democrática do Congo",
        name_long: "República Democrática do Congo",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Демократическая Республика Конго",
        name_long: "Демократическая Республика Конго",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Demokratische Republik Kongo",
        name_long: "Demokratische Republik Kongo",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Repubblica Democratica del Congo",
        name_long: "Repubblica Democratica del Congo",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "CIV",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Côte d'Ivoire",
        name_long: "Republic of Côte d'Ivoire",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "ساحل العاج",
        name_long: "جمهورية ساحل العاج",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Costa de Marfil",
        name_long: "República de Côte d'Ivoire",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Côte d'Ivoire",
        name_long: "République de Côte d'Ivoire",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Costa do Marfim",
        name_long: "República da Costa do Marfim",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Кот-д'Ивуар",
        name_long: "Республика Кот-д'Ивуар",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Elfenbeinküste",
        name_long: "Republik Côte d'Ivoire",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Costa d'Avorio",
        name_long: "Repubblica della Costa d'Avorio",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "DJI",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Djibouti",
        name_long: "Republic of Djibouti",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "جيبوتي",
        name_long: "جمهورية جيبوتي",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Yibuti",
        name_long: "República de Yibuti",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Djibouti",
        name_long: "République de Djibouti",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Djibuti",
        name_long: "República do Djibuti",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Джибути",
        name_long: "Республика Джибути",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Dschibuti",
        name_long: "Republik Dschibuti",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Gibuti",
        name_long: "Repubblica di Gibuti",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "EGY",
    continent: "Africa",
    region: "Northern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Egypt",
        name_long: "Arab Republic of Egypt",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "مصر",
        name_long: "جمهورية مصر العربية",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Egipto",
        name_long: "República Árabe de Egipto",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Égypte",
        name_long: "République arabe d'Égypte",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Egito",
        name_long: "República Árabe do Egito",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Египет",
        name_long: "Арабская Республика Египет",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Ägypten",
        name_long: "Arabische Republik Ägypten",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Egitto",
        name_long: "Repubblica Araba d'Egitto",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "GNQ",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Equatorial Guinea",
        name_long: "Republic of Equatorial Guinea",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "غينيا الاستوائية",
        name_long: "جمهورية غينيا الاستوائية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Guinea Ecuatorial",
        name_long: "República de Guinea Ecuatorial",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Guinée équatoriale",
        name_long: "République de Guinée équatoriale",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Guiné Equatorial",
        name_long: "República da Guiné Equatorial",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Экваториальная Гвинея",
        name_long: "Республика Экваториальная Гвинея",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Äquatorialguinea",
        name_long: "Republik Äquatorialguinea",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Guinea Equatoriale",
        name_long: "Repubblica della Guinea Equatoriale",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "ERI",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Eritrea",
        name_long: "State of Eritrea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "إريتريا",
        name_long: "دولة إريتريا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Eritrea",
        name_long: "Estado de Eritrea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Érythrée",
        name_long: "État d'Érythrée",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Eritreia",
        name_long: "Estado da Eritreia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Эритрея",
        name_long: "Государство Эритрея",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Eritrea",
        name_long: "Staat Eritrea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Eritrea",
        name_long: "Stato dell'Eritrea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SWZ",
    continent: "Africa",
    region: "Southern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Eswatini",
        name_long: "Kingdom of Eswatini",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "إسواتيني",
        name_long: "مملكة إسواتيني",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Esuatini",
        name_long: "Reino de Esuatini",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Eswatini",
        name_long: "Royaume d'Eswatini",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Eswatini",
        name_long: "Reino de Eswatini",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Эсватини",
        name_long: "Королевство Эсватини",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Eswatini",
        name_long: "Königreich Eswatini",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Eswatini",
        name_long: "Regno di Eswatini",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "ETH",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Ethiopia",
        name_long: "Federal Democratic Republic of Ethiopia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "إثيوبيا",
        name_long: "جمهورية إثيوبيا الفيدرالية الديمقراطية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Etiopía",
        name_long: "República Democrática Federal de Etiopía",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Éthiopie",
        name_long: "République fédérale démocratique d'Éthiopie",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Etiópia",
        name_long: "República Democrática Federal da Etiópia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Эфиопия",
        name_long: "Федеративная Демократическая Республика Эфиопия",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Äthiopien",
        name_long: "Demokratische Bundesrepublik Äthiopien",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Etiopia",
        name_long: "Repubblica Federale Democratica d'Etiopia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "GAB",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Gabon",
        name_long: "Gabonese Republic",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "الغابون",
        name_long: "جمهورية الغابون",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Gabón",
        name_long: "República Gabonesa",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Gabon",
        name_long: "République gabonaise",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Gabão",
        name_long: "República Gabonesa",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Габон",
        name_long: "Габонская Республика",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Gabun",
        name_long: "Gabunische Republik",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Gabon",
        name_long: "Repubblica Gabonese",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "GMB",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Gambia",
        name_long: "Republic of the Gambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "غامبيا",
        name_long: "جمهورية غامبيا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Gambia",
        name_long: "República de Gambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Gambie",
        name_long: "République de Gambie",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Gâmbia",
        name_long: "República da Gâmbia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Гамбия",
        name_long: "Республика Гамбия",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Gambia",
        name_long: "Republik Gambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Gambia",
        name_long: "Repubblica del Gambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "GHA",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Ghana",
        name_long: "Republic of Ghana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "غانا",
        name_long: "جمهورية غانا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Ghana",
        name_long: "República de Ghana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Ghana",
        name_long: "République du Ghana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Gana",
        name_long: "República do Gana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Гана",
        name_long: "Республика Гана",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Ghana",
        name_long: "Republik Ghana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Ghana",
        name_long: "Repubblica del Ghana",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "GIN",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Guinea",
        name_long: "Republic of Guinea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "غينيا",
        name_long: "جمهورية غينيا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Guinea",
        name_long: "República de Guinea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Guinée",
        name_long: "République de Guinée",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Guiné",
        name_long: "República da Guiné",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Гвинея",
        name_long: "Республика Гвинея",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Guinea",
        name_long: "Republik Guinea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Guinea",
        name_long: "Repubblica di Guinea",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "GNB",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Guinea-Bissau",
        name_long: "Republic of Guinea-Bissau",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "غينيا بيساو",
        name_long: "جمهورية غينيا بيساو",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Guinea-Bisáu",
        name_long: "República de Guinea-Bisáu",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Guinée-Bissau",
        name_long: "République de Guinée-Bissau",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Guiné-Bissau",
        name_long: "República da Guiné-Bissau",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Гвинея-Бисау",
        name_long: "Республика Гвинея-Бисау",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Guinea-Bissau",
        name_long: "Republik Guinea-Bissau",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Guinea-Bissau",
        name_long: "Repubblica della Guinea-Bissau",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "KEN",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Kenya",
        name_long: "Republic of Kenya",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "كينيا",
        name_long: "جمهورية كينيا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Kenia",
        name_long: "República de Kenia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Kenya",
        name_long: "République du Kenya",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Quênia",
        name_long: "República do Quênia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Кения",
        name_long: "Республика Кения",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Kenia",
        name_long: "Republik Kenia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Kenya",
        name_long: "Repubblica del Kenya",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "LSO",
    continent: "Africa",
    region: "Southern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Lesotho",
        name_long: "Kingdom of Lesotho",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "ليسوتو",
        name_long: "مملكة ليسوتو",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Lesoto",
        name_long: "Reino de Lesoto",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Lesotho",
        name_long: "Royaume du Lesotho",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Lesoto",
        name_long: "Reino do Lesoto",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Лесото",
        name_long: "Королевство Лесото",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Lesotho",
        name_long: "Königreich Lesotho",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Lesotho",
        name_long: "Regno del Lesotho",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "LBR",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Liberia",
        name_long: "Republic of Liberia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "ليبيريا",
        name_long: "جمهورية ليبيريا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Liberia",
        name_long: "República de Liberia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Libéria",
        name_long: "République du Libéria",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Libéria",
        name_long: "República da Libéria",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Либерия",
        name_long: "Республика Либерия",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Liberia",
        name_long: "Republik Liberia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Liberia",
        name_long: "Repubblica di Liberia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "LBY",
    continent: "Africa",
    region: "Northern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Libya",
        name_long: "State of Libya",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "ليبيا",
        name_long: "دولة ليبيا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Libia",
        name_long: "Estado de Libia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Libye",
        name_long: "État de Libye",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Líbia",
        name_long: "Estado da Líbia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Ливия",
        name_long: "Государство Ливия",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Libyen",
        name_long: "Staat Libyen",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Libia",
        name_long: "Stato di Libia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MDG",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Madagascar",
        name_long: "Republic of Madagascar",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "مدغشقر",
        name_long: "جمهورية مدغشقر",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Madagascar",
        name_long: "República de Madagascar",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Madagascar",
        name_long: "République de Madagascar",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Madagascar",
        name_long: "República de Madagascar",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Мадагаскар",
        name_long: "Республика Мадагаскар",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Madagaskar",
        name_long: "Republik Madagaskar",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Madagascar",
        name_long: "Repubblica del Madagascar",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MWI",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Malawi",
        name_long: "Republic of Malawi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "مالاوي",
        name_long: "جمهورية مالاوي",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Malaui",
        name_long: "República de Malaui",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Malawi",
        name_long: "République du Malawi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Malawi",
        name_long: "República do Malawi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Малави",
        name_long: "Республика Малави",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Malawi",
        name_long: "Republik Malawi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Malawi",
        name_long: "Repubblica del Malawi",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MLI",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Mali",
        name_long: "Republic of Mali",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "مالي",
        name_long: "جمهورية مالي",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Malí",
        name_long: "República de Malí",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Mali",
        name_long: "République du Mali",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Mali",
        name_long: "República do Mali",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Мали",
        name_long: "Республика Мали",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Mali",
        name_long: "Republik Mali",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Mali",
        name_long: "Repubblica del Mali",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MRT",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Mauritania",
        name_long: "Islamic Republic of Mauritania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "موريتانيا",
        name_long: "الجمهورية الإسلامية الموريتانية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Mauritania",
        name_long: "República Islámica de Mauritania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Mauritanie",
        name_long: "République islamique de Mauritanie",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Mauritânia",
        name_long: "República Islâmica da Mauritânia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Мавритания",
        name_long: "Исламская Республика Мавритания",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Mauretanien",
        name_long: "Islamische Republik Mauretanien",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Mauritania",
        name_long: "Repubblica Islamica di Mauritania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MUS",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Mauritius",
        name_long: "Republic of Mauritius",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "موريشيوس",
        name_long: "جمهورية موريشيوس",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Mauricio",
        name_long: "República de Mauricio",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Maurice",
        name_long: "République de Maurice",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Maurícia",
        name_long: "República de Maurícia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Маврикий",
        name_long: "Республика Маврикий",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Mauritius",
        name_long: "Republik Mauritius",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Mauritius",
        name_long: "Repubblica di Mauritius",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MAR",
    continent: "Africa",
    region: "Northern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Morocco",
        name_long: "Kingdom of Morocco",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "المغرب",
        name_long: "المملكة المغربية",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Marruecos",
        name_long: "Reino de Marruecos",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Maroc",
        name_long: "Royaume du Maroc",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Marrocos",
        name_long: "Reino de Marrocos",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Марокко",
        name_long: "Королевство Марокко",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Marokko",
        name_long: "Königreich Marokko",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Marocco",
        name_long: "Regno del Marocco",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "MOZ",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Mozambique",
        name_long: "Republic of Mozambique",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "موزمبيق",
        name_long: "جمهورية موزمبيق",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Mozambique",
        name_long: "República de Mozambique",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Mozambique",
        name_long: "République du Mozambique",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Moçambique",
        name_long: "República de Moçambique",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Мозамбик",
        name_long: "Республика Мозамбик",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Mosambik",
        name_long: "Republik Mosambik",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Mozambico",
        name_long: "Repubblica del Mozambico",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "NAM",
    continent: "Africa",
    region: "Southern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Namibia",
        name_long: "Republic of Namibia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "ناميبيا",
        name_long: "جمهورية ناميبيا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Namibia",
        name_long: "República de Namibia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Namibie",
        name_long: "République de Namibie",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Namíbia",
        name_long: "República da Namíbia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Намибия",
        name_long: "Республика Намибия",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Namibia",
        name_long: "Republik Namibia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Namibia",
        name_long: "Repubblica della Namibia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "NER",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Niger",
        name_long: "Republic of the Niger",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "النيجر",
        name_long: "جمهورية النيجر",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Níger",
        name_long: "República del Níger",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Niger",
        name_long: "République du Niger",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Níger",
        name_long: "República do Níger",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Нигер",
        name_long: "Республика Нигер",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Niger",
        name_long: "Republik Niger",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Niger",
        name_long: "Repubblica del Niger",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "NGA",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Nigeria",
        name_long: "Federal Republic of Nigeria",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "نيجيريا",
        name_long: "جمهورية نيجيريا الاتحادية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Nigeria",
        name_long: "República Federal de Nigeria",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Nigéria",
        name_long: "République fédérale du Nigéria",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Nigéria",
        name_long: "República Federal da Nigéria",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Нигерия",
        name_long: "Федеративная Республика Нигерия",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Nigeria",
        name_long: "Bundesrepublik Nigeria",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Nigeria",
        name_long: "Repubblica Federale di Nigeria",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "RWA",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Rwanda",
        name_long: "Republic of Rwanda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "رواندا",
        name_long: "جمهورية رواندا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Ruanda",
        name_long: "República de Ruanda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Rwanda",
        name_long: "République du Rwanda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Ruanda",
        name_long: "República do Ruanda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Руанда",
        name_long: "Республика Руанда",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Ruanda",
        name_long: "Republik Ruanda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Ruanda",
        name_long: "Repubblica del Ruanda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "STP",
    continent: "Africa",
    region: "Middle Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "São Tomé and Príncipe",
        name_long: "Democratic Republic of São Tomé and Príncipe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "ساو تومي وبرينسيبي",
        name_long: "جمهورية ساو تومي وبرينسيبي الديمقراطية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Santo Tomé y Príncipe",
        name_long: "República Democrática de Santo Tomé y Príncipe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Sao Tomé-et-Principe",
        name_long: "République démocratique de Sao Tomé-et-Principe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "São Tomé e Príncipe",
        name_long: "República Democrática de São Tomé e Príncipe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Сан-Томе и Принсипи",
        name_long: "Демократическая Республика Сан-Томе и Принсипи",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "São Tomé und Príncipe",
        name_long: "Demokratische Republik São Tomé und Príncipe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "São Tomé e Príncipe",
        name_long: "Repubblica Democratica di São Tomé e Príncipe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SEN",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Senegal",
        name_long: "Republic of Senegal",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "السنغال",
        name_long: "جمهورية السنغال",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Senegal",
        name_long: "República de Senegal",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Sénégal",
        name_long: "République du Sénégal",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Senegal",
        name_long: "República do Senegal",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Сенегал",
        name_long: "Республика Сенегал",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Senegal",
        name_long: "Republik Senegal",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Senegal",
        name_long: "Repubblica del Senegal",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SYC",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Seychelles",
        name_long: "Republic of Seychelles",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "سيشل",
        name_long: "جمهورية سيشل",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Seychelles",
        name_long: "República de Seychelles",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Seychelles",
        name_long: "République des Seychelles",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Seychelles",
        name_long: "República das Seychelles",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Сейшельские Острова",
        name_long: "Республика Сейшельские Острова",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Seychellen",
        name_long: "Republik Seychellen",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Seychelles",
        name_long: "Repubblica delle Seychelles",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SLE",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Sierra Leone",
        name_long: "Republic of Sierra Leone",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "سيراليون",
        name_long: "جمهورية سيراليون",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Sierra Leona",
        name_long: "República de Sierra Leona",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Sierra Leone",
        name_long: "République de Sierra Leone",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Serra Leoa",
        name_long: "República da Serra Leoa",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Сьерра-Леоне",
        name_long: "Республика Сьерра-Леоне",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Sierra Leone",
        name_long: "Republik Sierra Leone",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Sierra Leone",
        name_long: "Repubblica della Sierra Leone",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SOM",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Somalia",
        name_long: "Federal Republic of Somalia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "الصومال",
        name_long: "جمهورية الصومال الفيدرالية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Somalia",
        name_long: "República Federal de Somalia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Somalie",
        name_long: "République fédérale de Somalie",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Somália",
        name_long: "República Federal da Somália",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Сомали",
        name_long: "Федеративная Республика Сомали",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Somalia",
        name_long: "Bundesrepublik Somalia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Somalia",
        name_long: "Repubblica Federale di Somalia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "ZAF",
    continent: "Africa",
    region: "Southern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "South Africa",
        name_long: "Republic of South Africa",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "جنوب أفريقيا",
        name_long: "جمهورية جنوب أفريقيا",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Sudáfrica",
        name_long: "República de Sudáfrica",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Afrique du Sud",
        name_long: "République d'Afrique du Sud",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "África do Sul",
        name_long: "República da África do Sul",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Южная Африка",
        name_long: "Южно-Африканская Республика",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Südafrika",
        name_long: "Republik Südafrika",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Sudafrica",
        name_long: "Repubblica del Sudafrica",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SSD",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "South Sudan",
        name_long: "Republic of South Sudan",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "جنوب السودان",
        name_long: "جمهورية جنوب السودان",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Sudán del Sur",
        name_long: "República de Sudán del Sur",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Soudan du Sud",
        name_long: "République du Soudan du Sud",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Sudão do Sul",
        name_long: "República do Sudão do Sul",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Южный Судан",
        name_long: "Республика Южный Судан",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Südsudan",
        name_long: "Republik Südsudan",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Sudan del Sud",
        name_long: "Repubblica del Sudan del Sud",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "SDN",
    continent: "Africa",
    region: "Northern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Sudan",
        name_long: "Republic of the Sudan",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "السودان",
        name_long: "جمهورية السودان",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Sudán",
        name_long: "República del Sudán",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Soudan",
        name_long: "République du Soudan",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Sudão",
        name_long: "República do Sudão",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Судан",
        name_long: "Республика Судан",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Sudan",
        name_long: "Republik Sudan",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Sudan",
        name_long: "Repubblica del Sudan",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "TZA",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Tanzania",
        name_long: "United Republic of Tanzania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "تنزانيا",
        name_long: "جمهورية تنزانيا الاتحادية",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Tanzania",
        name_long: "República Unida de Tanzania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Tanzanie",
        name_long: "République unie de Tanzanie",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Tanzânia",
        name_long: "República Unida da Tanzânia",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Танзания",
        name_long: "Объединённая Республика Танзания",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Tansania",
        name_long: "Vereinigte Republik Tansania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Tanzania",
        name_long: "Repubblica Unita di Tanzania",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "TGO",
    continent: "Africa",
    region: "Western Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Togo",
        name_long: "Togolese Republic",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "توغو",
        name_long: "جمهورية توغو",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Togo",
        name_long: "República Togolesa",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Togo",
        name_long: "République togolaise",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Togo",
        name_long: "República Togolesa",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Того",
        name_long: "Тоголезская Республика",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Togo",
        name_long: "Republik Togo",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Togo",
        name_long: "Repubblica Togolese",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "TUN",
    continent: "Africa",
    region: "Northern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Tunisia",
        name_long: "Republic of Tunisia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "تونس",
        name_long: "الجمهورية التونسية",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Túnez",
        name_long: "República de Túnez",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Tunisie",
        name_long: "République tunisienne",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Tunísia",
        name_long: "República da Tunísia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Тунис",
        name_long: "Тунисская Республика",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Tunesien",
        name_long: "Republik Tunesien",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Tunisia",
        name_long: "Repubblica Tunisina",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "UGA",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Uganda",
        name_long: "Republic of Uganda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "أوغندا",
        name_long: "جمهورية أوغندا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Uganda",
        name_long: "República de Uganda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Ouganda",
        name_long: "République d'Ouganda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Uganda",
        name_long: "República do Uganda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Уганда",
        name_long: "Республика Уганда",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Uganda",
        name_long: "Republik Uganda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Uganda",
        name_long: "Repubblica dell'Uganda",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "ZMB",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Zambia",
        name_long: "Republic of Zambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "زامبيا",
        name_long: "جمهورية زامبيا",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Zambia",
        name_long: "República de Zambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Zambie",
        name_long: "République de Zambie",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Zâmbia",
        name_long: "República da Zâmbia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Замбия",
        name_long: "Республика Замбия",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Sambia",
        name_long: "Republik Sambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Zambia",
        name_long: "Repubblica dello Zambia",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
  {
    code: "ZWE",
    continent: "Africa",
    region: "Eastern Africa",
    heroImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",

    isActive: true,
    translations: [
      {
        locale: "en",
        name: "Zimbabwe",
        name_long: "Republic of Zimbabwe",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ar",
        name: "زيمبابوي",
        name_long: "جمهورية زيمبابوي",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "es",
        name: "Zimbabue",
        name_long: "República de Zimbabue",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "fr",
        name: "Zimbabwe",
        name_long: "République du Zimbabwe",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "pt",
        name: "Zimbabué",
        name_long: "República do Zimbabué",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "ru",
        name: "Зимбабве",
        name_long: "Республика Зимбабве",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "de",
        name: "Simbabwe",
        name_long: "Republik Simbabwe",
        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
      {
        locale: "it",
        name: "Zimbabwe",
        name_long: "Repubblica dello Zimbabwe",

        about:
          "Beautiful destination with rich culture and heritage. Discover the wonders of this amazing place.",
      },
    ],
  },
];
