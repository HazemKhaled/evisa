# CI/CD Setup Completion Checklist

This document provides the final steps needed to complete the CI/CD setup for GetTravelVisa.com.

## ✅ Completed Configuration

- [x] Created staging deployment workflow for `main` branch
- [x] Created production deployment workflow for GitHub releases
- [x] Created PR preview deployment workflow with automatic cleanup
- [x] Updated wrangler.jsonc with staging and production environments
- [x] Configured open-next.config.ts for SSG and image optimization
- [x] Added comprehensive CI/CD documentation

## 🔧 Required Manual Setup Steps

### 1. Cloudflare Database Setup

You need to create the staging and production databases and update the configuration:

```bash
# Create staging database
wrangler d1 create gtv-db-staging

# Create production database
wrangler d1 create gtv-db-prod
```

### 2. Update Database IDs in wrangler.jsonc

Replace the placeholders in `wrangler.jsonc`:

- `staging-database-id-placeholder` → Replace with actual staging database ID
- `production-database-id-placeholder` → Replace with actual production database ID

### 3. GitHub Secrets Configuration

Add the following secrets in GitHub repository settings (Settings → Secrets and variables → Actions):

#### Repository Secrets:

- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with permissions for:
  - Workers:read, Workers:edit
  - D1:read, D1:edit
  - Zone:read (for custom domains)
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### 4. GitHub Environments Setup

Create the following environments in GitHub (Settings → Environments):

#### Staging Environment:

- Name: `staging`
- Protection rules: (optional) Require review for main branch deployments
- Environment secrets: Same as repository secrets

#### Production Environment:

- Name: `production`
- Protection rules: (recommended) Require manual approval
- Environment secrets: Same as repository secrets

### 5. Cloudflare Custom Domains

Configure the following custom domains in your Cloudflare dashboard:

#### Staging Domain:

- `staging.gettravelvisa.com`
- Wildcard for PR previews: `*.staging.gettravelvisa.com`

#### Production Domain:

- `gettravelvisa.com`
- `www.gettravelvisa.com` (optional redirect)

### 6. Branch Protection Rules

Set up branch protection for `main` branch:

- Require pull request reviews
- Require status checks to pass (test workflow)
- Require branches to be up to date
- Restrict pushes to main branch

## 🚀 Testing the Setup

### 1. Test PR Preview

1. Create a new feature branch
2. Make a small change and push
3. Open a PR → should trigger PR preview deployment
4. Check that preview URL is commented on PR

### 2. Test Staging Deployment

1. Merge a PR to main branch
2. Check GitHub Actions for staging deployment
3. Verify deployment at staging.gettravelvisa.com

### 3. Test Production Deployment

1. Create a GitHub release
2. Check GitHub Actions for production deployment
3. Verify deployment at gettravelvisa.com

## 🐛 Troubleshooting

### Common Issues:

1. **Database Connection Errors**: Ensure database IDs are correctly set in wrangler.jsonc
2. **Domain Routing Issues**: Verify custom domains are properly configured in Cloudflare
3. **Permission Errors**: Check that API token has all required permissions
4. **Build Failures**: Ensure dependencies are correctly installed and Google Fonts are accessible

### Debug Commands:

```bash
# Test local build
pnpm build

# Test OpenNext build locally
pnpm exec opennextjs-cloudflare build

# Preview deployment locally
pnpm preview

# Check Cloudflare authentication
pnpm exec wrangler whoami

# Test database connection
pnpm exec wrangler d1 info gtv-db-staging
```

## 📋 Workflow Overview

### Automated Workflows:

1. **Pull Request** → Tests + Linting + PR Preview
2. **Merge to Main** → Tests + Linting + Staging Deployment
3. **GitHub Release** → Tests + Linting + Production Deployment
4. **PR Close** → Cleanup PR Preview

### Manual Tasks:

- Database migrations (included in deployment workflows)
- Domain configuration (one-time setup)
- Secret management (secure setup)

## 🔒 Security Best Practices

- Use environment-specific API tokens if available
- Enable branch protection rules
- Require manual approval for production deployments
- Regular rotation of API tokens
- Monitor deployment logs for suspicious activity

## 📈 Next Steps

After completing the setup:

1. Test all deployment workflows thoroughly
2. Set up monitoring and alerting
3. Configure R2 cache for better performance (optional)
4. Implement database backup strategy
5. Set up staging data seeding workflow

---

For detailed implementation information, see [CI-CD.md](./CI-CD.md) documentation.
