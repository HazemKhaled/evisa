# Country Flags

This directory contains SVG flag files for countries in the eVisa platform.

## File Naming Convention

- Files are named using the lowercase ISO 3166-1 alpha-3 country code
- Example: `usa.svg` for United States, `are.svg` for United Arab Emirates

## Usage

Use the utility functions in `src/lib/utils/flags.ts`:

```typescript
import { getFlagUrl, getFlagUrlWithFallback } from "@/lib/utils/flags";

// Get flag URL for a country
const flagUrl = getFlagUrl("USA"); // Returns: "/flags/usa.svg"

// Get flag URL with fallback
const safeFlag = getFlagUrlWithFallback("USA", "/flags/default.svg");
```

## Adding New Flags

1. Create an SVG file with the country's ISO 3166-1 alpha-3 code (lowercase)
2. Use a consistent viewBox (recommended: `viewBox="0 0 60 30"`)
3. Keep file sizes small - use simple shapes and minimal colors
4. Ensure good contrast for accessibility

## Current Flags

- `usa.svg` - United States
- `are.svg` - United Arab Emirates
- `gbr.svg` - United Kingdom
- `deu.svg` - Germany
- `jpn.svg` - Japan

## Benefits of SVG Flags

- **Scalable**: Perfect quality at any size
- **Small file size**: Much smaller than bitmap images
- **Customizable**: Easy to modify colors and styling
- **Performance**: Fast loading and rendering
- **Accessibility**: Can be styled for high contrast modes
