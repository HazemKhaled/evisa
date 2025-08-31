import { getDatabase, schema } from "./index";

const seedData = {
  destinations: [
    {
      code: "AE",
      name: "United Arab Emirates",
      nameAr: "دولة الإمارات العربية المتحدة",
      flag: "🇦🇪",
      region: "Middle East",
      capital: "Abu Dhabi",
      capitalAr: "أبوظبي",
      description:
        "A federation of seven emirates known for modern cities, luxury shopping, and rich cultural heritage.",
      descriptionAr: "اتحاد سبع إمارات معروف بالمدن الحديثة والتسوق الفاخر والتراث الثقافي الغني.",
    },
    {
      code: "US",
      name: "United States",
      nameAr: "الولايات المتحدة الأمريكية",
      flag: "🇺🇸",
      region: "North America",
      capital: "Washington, D.C.",
      capitalAr: "واشنطن العاصمة",
      description:
        "A diverse country known for its innovation, natural beauty, and cultural attractions.",
      descriptionAr: "بلد متنوع معروف بالابتكار والجمال الطبيعي والمعالم الثقافية.",
    },
    {
      code: "GB",
      name: "United Kingdom",
      nameAr: "المملكة المتحدة",
      flag: "🇬🇧",
      region: "Europe",
      capital: "London",
      capitalAr: "لندن",
      description:
        "Historic island nation known for its rich history, cultural landmarks, and royal heritage.",
      descriptionAr: "دولة جزيرة تاريخية معروفة بتاريخها الغني ومعالمها الثقافية والتراث الملكي.",
    },
    {
      code: "DE",
      name: "Germany",
      nameAr: "ألمانيا",
      flag: "🇩🇪",
      region: "Europe",
      capital: "Berlin",
      capitalAr: "برلين",
      description:
        "Central European country known for its engineering, culture, and historic cities.",
      descriptionAr: "دولة أوروبا الوسطى معروفة بالهندسة والثقافة والمدن التاريخية.",
    },
    {
      code: "JP",
      name: "Japan",
      nameAr: "اليابان",
      flag: "🇯🇵",
      region: "Asia",
      capital: "Tokyo",
      capitalAr: "طوكيو",
      description: "Island nation known for technology, traditional culture, and unique cuisine.",
      descriptionAr: "دولة جزيرة معروفة بالتكنولوجيا والثقافة التقليدية والمأكولات الفريدة.",
    },
    {
      code: "AU",
      name: "Australia",
      nameAr: "أستراليا",
      flag: "🇦🇺",
      region: "Oceania",
      capital: "Canberra",
      capitalAr: "كانبرا",
      description:
        "Continent country known for its wildlife, natural wonders, and outdoor lifestyle.",
      descriptionAr:
        "دولة قارية معروفة بالحياة البرية والعجائب الطبيعية ونمط الحياة في الهواء الطلق.",
    },
    {
      code: "CA",
      name: "Canada",
      nameAr: "كندا",
      flag: "🇨🇦",
      region: "North America",
      capital: "Ottawa",
      capitalAr: "أوتاوا",
      description:
        "Second-largest country known for its natural beauty, multiculturalism, and friendly people.",
      descriptionAr: "ثاني أكبر دولة معروفة بجمالها الطبيعي والتعددية الثقافية والأشخاص الودودين.",
    },
    {
      code: "FR",
      name: "France",
      nameAr: "فرنسا",
      flag: "🇫🇷",
      region: "Europe",
      capital: "Paris",
      capitalAr: "باريس",
      description: "European country known for art, cuisine, fashion, and historic landmarks.",
      descriptionAr: "دولة أوروبية معروفة بالفن والمأكولات والأزياء والمعالم التاريخية.",
    },
  ],
  passportCountries: [
    {
      code: "AE",
      name: "United Arab Emirates",
      nameAr: "دولة الإمارات العربية المتحدة",
      flag: "🇦🇪",
    },
    { code: "SA", name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", flag: "🇸🇦" },
    { code: "US", name: "United States", nameAr: "الولايات المتحدة الأمريكية", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", nameAr: "المملكة المتحدة", flag: "🇬🇧" },
    { code: "DE", name: "Germany", nameAr: "ألمانيا", flag: "🇩🇪" },
    { code: "FR", name: "France", nameAr: "فرنسا", flag: "🇫🇷" },
    { code: "JP", name: "Japan", nameAr: "اليابان", flag: "🇯🇵" },
    { code: "IN", name: "India", nameAr: "الهند", flag: "🇮🇳" },
    { code: "PK", name: "Pakistan", nameAr: "باكستان", flag: "🇵🇰" },
    { code: "EG", name: "Egypt", nameAr: "مصر", flag: "🇪🇬" },
  ],
  articles: [
    {
      destinationId: 1, // UAE
      title: "Complete Guide to UAE Visa Requirements",
      titleAr: "دليل شامل لمتطلبات التأشيرة الإماراتية",
      slug: "uae-visa-requirements-guide",
      content:
        "The United Arab Emirates offers various visa options for tourists, business travelers, and residents. This comprehensive guide covers all visa types, requirements, and application processes.",
      contentAr:
        "تقدم دولة الإمارات العربية المتحدة خيارات تأشيرة متنوعة للسياح ومسافري الأعمال والمقيمين. يغطي هذا الدليل الشامل جميع أنواع التأشيرات والمتطلبات وعمليات التقديم.",
      excerpt: "Everything you need to know about getting a visa for the United Arab Emirates.",
      excerptAr: "كل ما تحتاج لمعرفته حول الحصول على تأشيرة لدولة الإمارات العربية المتحدة.",
      featuredImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
      author: "eVisa Team",
      isPublished: true,
      publishedAt: "2024-01-15T10:00:00Z",
    },
    {
      destinationId: 2, // US
      title: "US Visa Application: Step-by-Step Guide",
      titleAr: "تطبيق التأشيرة الأمريكية: دليل خطوة بخطوة",
      slug: "us-visa-application-guide",
      content:
        "Navigating the US visa application process can be complex. This guide provides detailed steps for different visa categories including tourist, business, and student visas.",
      contentAr:
        "يمكن أن يكون التنقل في عملية طلب التأشيرة الأمريكية معقداً. يقدم هذا الدليل خطوات مفصلة لفئات التأشيرات المختلفة بما في ذلك تأشيرات السياحة والأعمال والطلاب.",
      excerpt:
        "Navigate the US visa application process with our comprehensive step-by-step guide.",
      excerptAr: "تنقل في عملية طلب التأشيرة الأمريكية مع دليلنا الشامل خطوة بخطوة.",
      featuredImage: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800",
      author: "eVisa Team",
      isPublished: true,
      publishedAt: "2024-01-10T10:00:00Z",
    },
  ],
};

export async function seedDatabase() {
  const db = await getDatabase();

  if (!db) {
    throw new Error("Database not available. This script requires a Cloudflare environment.");
  }

  try {
    // Seed destinations
    for (const destination of seedData.destinations) {
      await db
        .insert(schema.destinations)
        .values(destination)
        .onConflictDoUpdate({
          target: schema.destinations.code,
          set: {
            name: destination.name,
            nameAr: destination.nameAr,
            flag: destination.flag,
            region: destination.region,
            capital: destination.capital,
            capitalAr: destination.capitalAr,
            description: destination.description,
            descriptionAr: destination.descriptionAr,
            updatedAt: new Date().toISOString(),
          },
        });
    }

    // Seed passport countries
    for (const country of seedData.passportCountries) {
      await db
        .insert(schema.passportCountries)
        .values(country)
        .onConflictDoUpdate({
          target: schema.passportCountries.code,
          set: {
            name: country.name,
            nameAr: country.nameAr,
            flag: country.flag,
            updatedAt: new Date().toISOString(),
          },
        });
    }

    // Seed articles
    for (const article of seedData.articles) {
      await db
        .insert(schema.articles)
        .values(article)
        .onConflictDoUpdate({
          target: schema.articles.slug,
          set: {
            title: article.title,
            titleAr: article.titleAr,
            content: article.content,
            contentAr: article.contentAr,
            excerpt: article.excerpt,
            excerptAr: article.excerptAr,
            featuredImage: article.featuredImage,
            author: article.author,
            isPublished: article.isPublished,
            publishedAt: article.publishedAt,
            updatedAt: new Date().toISOString(),
          },
        });
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
