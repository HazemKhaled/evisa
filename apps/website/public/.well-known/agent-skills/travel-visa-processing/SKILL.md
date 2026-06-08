# travel-visa-processing

Check travel visa requirements, eligibility, and processing times for any destination in the world.

## Description
This skill enables checking visa eligibility status (such as visa-free, on arrival, required, or eta) and searching the catalog for destination-based requirements.

## API Endpoints

### 1. Check Visa Eligibility
Checks requirements between passport country and destination country.
- **Endpoint:** `GET /api/eligibility`
- **Arguments:**
  - `passport` (required): ISO country code of passport
  - `destination` (required): ISO country code of destination
  - `locale` (optional): language locale (default: `en`)

### 2. Search Destinations
Searches country codes and names in the visa database.
- **Endpoint:** `GET /api/search`
- **Arguments:**
  - `q` (required): search string
  - `locale` (optional): language locale (default: `en`)
  - `limit` (optional): max number of results (default: `10`)
