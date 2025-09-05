# Countries Database Seeding

This directory contains comprehensive scripts for seeding the database with all world countries and their multilingual translations.

## Overview

The countries seeding system provides:

- **190+ countries** from all continents
- **1,536+ translations** across 8 locales (en, ar, es, fr, pt, ru, de, it)
- **ISO 3166-1 alpha-3** country codes
- **Continent and region** classification
- **Multilingual support** for internationalization

## Files Structure

```
scripts/
├── countries-data.ts              # African countries data
├── countries-data-asia.ts         # Asian countries data
├── countries-data-europe.ts       # European countries data
├── countries-data-americas.ts     # North & South American countries data
├── countries-data-oceania.ts      # Oceanian countries data
├── seed.ts                        # Main seeding script (includes countries seeding)
└── README-countries-seeding.md    # This documentation
```

## Database Schema

### Countries Table

- `id`: Primary key (auto-increment)
- `code`: ISO 3166-1 alpha-3 country code (e.g., "USA", "ARE")
- `continent`: Continent name (e.g., "North America", "Asia")
- `region`: Sub-region (e.g., "Northern America", "Western Asia")
- `isActive`: Boolean flag for active countries
- `createdAt`, `updatedAt`, `deletedAt`: Timestamps

### Countries I18n Table

- `id`: Primary key (auto-increment)
- `countryId`: Foreign key to countries table
- `locale`: Language code (en, ar, es, fr)
- `name`: Country name in the specified locale
- `description`: Full country name/description in the specified locale
- `createdAt`, `updatedAt`: Timestamps

## Usage

### 1. Setup Local Database

```bash
pnpm db:local:setup-schema
```

Creates the local SQLite database with all required tables.

### 2. Seed Countries Data

```bash
# Seed only countries (190+ countries)
pnpm tsx scripts/seed.ts countries

# Or seed everything including sample visa data
pnpm tsx scripts/seed.ts
```

Populates the database with all 190+ countries and their translations in 8 languages.

## Data Statistics

### Countries by Continent

- **Africa**: 54 countries
- **Europe**: 45 countries
- **Asia**: 44 countries
- **North America**: 23 countries
- **Oceania**: 14 countries
- **South America**: 12 countries

### Supported Locales

- `en`: English
- `ar`: Arabic (العربية)
- `es`: Spanish (Español)
- `fr`: French (Français)
- `pt`: Portuguese (Português)
- `ru`: Russian (Русский)
- `de`: German (Deutsch)
- `it`: Italian (Italiano)

## Sample Data

### Country Example: United Arab Emirates (ARE)

```json
{
  "code": "ARE",
  "continent": "Asia",
  "region": "Western Asia",
  "translations": [
    {
      "locale": "en",
      "name": "United Arab Emirates",
      "description": "United Arab Emirates"
    },
    {
      "locale": "ar",
      "name": "الإمارات العربية المتحدة",
      "description": "دولة الإمارات العربية المتحدة"
    },
    {
      "locale": "es",
      "name": "Emiratos Árabes Unidos",
      "description": "Emiratos Árabes Unidos"
    },
    {
      "locale": "fr",
      "name": "Émirats arabes unis",
      "description": "Émirats arabes unis"
    },
    {
      "locale": "pt",
      "name": "Emirados Árabes Unidos",
      "description": "Emirados Árabes Unidos"
    },
    {
      "locale": "ru",
      "name": "Объединенные Арабские Эмираты",
      "description": "Объединенные Арабские Эмираты"
    },
    {
      "locale": "de",
      "name": "Vereinigte Arabische Emirate",
      "description": "Vereinigte Arabische Emirate"
    },
    {
      "locale": "it",
      "name": "Emirati Arabi Uniti",
      "description": "Emirati Arabi Uniti"
    }
  ]
}
```

## Integration with Application

The seeded countries data integrates with the GetTravelVisa.com platform for:

1. **Visa Destination Selection**: Users can select from all world countries
2. **Passport Country Selection**: Users can select their passport country
3. **Multilingual Support**: Country names display in user's preferred language
4. **Visa Eligibility Rules**: Countries are used as destinations and passport countries
5. **Search and Filtering**: Countries can be filtered by continent/region

## Database Location

- **Local Development**: `./local-db.sqlite`
- **Production**: Cloudflare D1 database

## Maintenance

### Adding New Countries

1. Add country data to appropriate continent file
2. Include all 4 locale translations
3. Run seed script to update database

### Adding New Locales

1. Update all country data files with new locale
2. Update database schema if needed
3. Re-run seed script

### Updating Country Information

1. Modify country data in appropriate file
2. Re-run seed script (clears and re-inserts all data)

## Error Handling

The seeding script includes comprehensive error handling:

- Individual country insertion errors don't stop the process
- Detailed logging of success/failure counts
- Verification script to ensure data integrity

## Performance

- **Seeding Time**: ~3-5 seconds for all 190+ countries with 8 languages
- **Database Size**: ~1MB for countries + translations
- **Memory Usage**: Minimal, processes countries in batches

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure local database is set up: `pnpm db:local:setup-schema`
   - Check file permissions on `local-db.sqlite`

2. **Translation Missing**
   - Verify all countries have 8 locale translations
   - Check for typos in locale codes (en, ar, es, fr, pt, ru, de, it)

3. **Duplicate Country Codes**
   - Ensure each country has unique ISO 3166-1 alpha-3 code
   - Check for case sensitivity issues

### Verification Commands

```bash
# Check database by running seed script in countries mode
pnpm tsx scripts/seed.ts countries
```

## Future Enhancements

- [x] Support for 8 languages (en, ar, es, fr, pt, ru, de, it) - **COMPLETED**
- [ ] Add additional locales (zh, ja, ko, hi, etc.)
- [ ] Include country flags/emoji data
- [ ] Add country calling codes
- [ ] Include currency information
- [ ] Add timezone data
- [ ] Include country population data
