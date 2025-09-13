# Deployment Architecture

## Deployment Strategy

**Frontend Deployment:**

- **Platform:** Cloudflare Workers via OpenNext.js transformation
- **Build Command:** `pnpm build && npx @opennext/cloudflare`
- **Output Directory:** `.open-next/` with Workers-compatible artifacts
- **CDN/Edge:** Cloudflare's global edge network with 200+ locations

**Backend Deployment:**

- **Platform:** Integrated with frontend as single Cloudflare Worker
- **Build Command:** Included in OpenNext.js build process
- **Deployment Method:** Wrangler CLI with automated GitHub Actions

**Database Deployment:**

- **Platform:** Cloudflare D1 (SQLite at edge)
- **Migration Method:** Drizzle migrations via Wrangler
- **Backup Strategy:** Automated D1 backups with point-in-time recovery

## CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]
  release:
    types: [published]

env:
  NODE_VERSION: "20"
  PNPM_VERSION: "8"

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run type checking
        run: pnpm type-check

      - name: Run linting
        run: pnpm lint

      - name: Run tests
        run: pnpm test:coverage
        env:
          DATABASE_URL: ${{ secrets.TEST_DATABASE_URL }}

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  build:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      deployment-url: ${{ steps.deploy.outputs.deployment-url }}
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js and pnpm
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build application
        run: pnpm build
        env:
          NEXT_PUBLIC_APP_URL: ${{ github.ref == 'refs/heads/main' && 'https://staging.gettravelvisa.com' || 'https://gettravelvisa.com' }}
          SENTRY_DSN: ${{ secrets.SENTRY_DSN }}

      - name: Run database migrations
        run: pnpm db:migrate
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          DATABASE_ID: ${{ github.ref == 'refs/heads/main' && secrets.STAGING_DATABASE_ID || secrets.PROD_DATABASE_ID }}

      - name: Deploy to Cloudflare
        id: deploy
        run: |
          if [ "${{ github.ref }}" = "refs/heads/main" ]; then
            # Deploy to staging
            npx wrangler pages deploy --project-name=gettravelvisa-staging
            echo "deployment-url=https://staging.gettravelvisa.com" >> $GITHUB_OUTPUT
          else
            # Deploy to production (releases only)
            npx wrangler pages deploy --project-name=gettravelvisa-prod
            echo "deployment-url=https://gettravelvisa.com" >> $GITHUB_OUTPUT
          fi
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}

  e2e-tests:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js and pnpm
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}

      - uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright
        run: pnpm exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm test:e2e
        env:
          BASE_URL: ${{ needs.build.outputs.deployment-url }}

      - name: Upload E2E artifacts
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  performance-audit:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4

      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            ${{ needs.build.outputs.deployment-url }}
            ${{ needs.build.outputs.deployment-url }}/d/ae
            ${{ needs.build.outputs.deployment-url }}/blog
          configPath: "./lighthouserc.json"
          uploadArtifacts: true
          temporaryPublicStorage: true
```

## Environment Configuration

**Staging Environment:**

- **Frontend URL:** https://staging.gettravelvisa.com
- **Backend URL:** Integrated with frontend Worker
- **Database:** Cloudflare D1 staging instance
- **Purpose:** Pre-production testing and content review

**Production Environment:**

- **Frontend URL:** https://gettravelvisa.com
- **Backend URL:** Integrated with frontend Worker
- **Database:** Cloudflare D1 production instance
- **Purpose:** Live environment serving users

**Development Environment:**

- **Frontend URL:** http://localhost:3000
- **Backend URL:** Local development server
- **Database:** Local D1 instance via Wrangler
- **Purpose:** Local development and testing

---
