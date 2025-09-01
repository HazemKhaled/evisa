# CI/CD Configuration for GetTravelVisa.com

This document outlines the CI/CD configuration for the GetTravelVisa.com platform, implemented according to the requirements in CLAUDE.md.

## Overview

The project uses GitHub Actions for CI/CD with OpenNext.js for Cloudflare Workers deployment. The setup includes automated testing, linting, and multi-environment deployments.

## Deployment Environments

### 🧪 Development Environment

- **Trigger**: Local development
- **Database**: Local D1 database via Wrangler
- **URL**: `localhost:3000`

### 🚀 Staging Environment

- **Trigger**: Push to `main` branch
- **Database**: `gettravelvisa-db-staging`
- **URL**: `staging.gettravelvisa.com`
- **Workflow**: `.github/workflows/deploy-staging.yml`

### 🌟 Production Environment

- **Trigger**: GitHub release published
- **Database**: `gettravelvisa-db-prod`
- **URL**: `gettravelvisa.com`
- **Workflow**: `.github/workflows/deploy-production.yml`

### 🔍 PR Preview Environment

- **Trigger**: Pull request opened/updated
- **Database**: Shared staging database
- **URL**: `pr-{number}.staging.gettravelvisa.com`
- **Workflow**: `.github/workflows/deploy-pr-preview.yml`
- **Cleanup**: `.github/workflows/cleanup-pr-preview.yml`

## GitHub Actions Workflows

### 1. Tests and Quality Checks (`test.yml`)

- **Trigger**: Pull requests to `main`
- **Purpose**: Runs type checking, linting, and tests
- **Coverage**: Uploads test coverage to Codecov

### 2. Deploy to Staging (`deploy-staging.yml`)

- **Trigger**: Push to `main` branch
- **Steps**:
  1. Install dependencies
  2. Run quality checks (type-check, lint, test)
  3. Build Next.js application
  4. Build for Cloudflare with OpenNext
  5. Deploy to Cloudflare Workers
  6. Run database migrations

### 3. Deploy to Production (`deploy-production.yml`)

- **Trigger**: GitHub release published
- **Steps**: Same as staging but deploys to production environment
- **Safety**: No concurrency cancellation for production

### 4. Deploy PR Preview (`deploy-pr-preview.yml`)

- **Trigger**: PR opened/updated
- **Features**:
  - Creates temporary worker for each PR
  - Comments on PR with preview URL
  - Updates comment on subsequent pushes
  - Only runs for PRs from the same repository

### 5. Cleanup PR Preview (`cleanup-pr-preview.yml`)

- **Trigger**: PR closed
- **Purpose**: Removes temporary worker and notifies in PR

## Configuration Files

### `wrangler.jsonc`

Cloudflare Workers configuration with environment-specific settings:

- Development environment with local D1 database
- Staging environment with custom domain routing
- Production environment with multiple domain routing

### `open-next.config.ts`

OpenNext.js configuration optimized for Cloudflare:

- SSG (Static Site Generation) support
- Image optimization ready
- Static assets handling
- R2 cache preparation (commented)

## Required Secrets

Configure these secrets in your GitHub repository settings:

### Environment Secrets

- `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Workers and D1 permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Database IDs

Update the following placeholders in `wrangler.jsonc`:

- `staging-database-id-placeholder`: Replace with actual staging D1 database ID
- `production-database-id-placeholder`: Replace with actual production D1 database ID

## Setup Instructions

### 1. Cloudflare Setup

```bash
# Create staging database
wrangler d1 create gettravelvisa-db-staging

# Create production database
wrangler d1 create gettravelvisa-db-prod

# Update wrangler.jsonc with the returned database IDs
```

### 2. GitHub Repository Setup

1. Add Cloudflare secrets to repository settings
2. Create staging and production environments in repository settings
3. Configure branch protection rules for `main` branch

### 3. Domain Configuration

Configure custom domains in Cloudflare:

- `staging.gettravelvisa.com` → Staging worker
- `gettravelvisa.com` → Production worker
- `pr-*.staging.gettravelvisa.com` → PR preview workers

## Development Workflow

### Feature Development

1. Create feature branch from `main`
2. Make changes and push
3. Open PR → triggers test workflow and PR preview deployment
4. Review and iterate
5. Merge PR → triggers staging deployment
6. Create release → triggers production deployment

### Database Migrations

Migrations are automatically applied during deployment:

- Staging: After staging deployment
- Production: After production deployment
- PR Previews: Use staging database (read-only recommended)

## Monitoring and Observability

- **Cloudflare Analytics**: Built-in observability enabled
- **Error Tracking**: Sentry integration (configured in application)
- **Performance**: Cloudflare Workers analytics
- **Uptime**: Cloudflare health checks

## Caching Strategy

The configuration supports multiple caching levels:

1. **CDN Caching**: Cloudflare edge caching
2. **SSG**: Static Site Generation for static pages
3. **R2 Cache**: Available for incremental cache (optional)
4. **Image Optimization**: Cloudflare Images integration ready

## Troubleshooting

### Common Issues

1. **Build Failures**: Check Google Fonts connectivity in restricted environments
2. **Database Connection**: Verify database IDs in wrangler.jsonc
3. **Domain Routing**: Ensure custom domains are properly configured in Cloudflare
4. **Preview Cleanup**: Manual cleanup may be required if workflow fails

### Debug Commands

```bash
# Test build locally
pnpm build

# Test OpenNext build
pnpm exec opennextjs-cloudflare build

# Preview locally
pnpm preview

# Check wrangler configuration
pnpm exec wrangler whoami
```

## Security Considerations

- API tokens have minimal required permissions
- PR previews only work for same-repository PRs
- Database access is environment-isolated
- Secrets are managed through GitHub encrypted secrets

## Performance Optimizations

- Concurrent builds with caching
- Build artifact reuse across environments
- Database connection pooling
- CDN edge caching
- Image optimization ready

---

For more details, refer to the [CLAUDE.md](./CLAUDE.md) file for complete project specifications.
