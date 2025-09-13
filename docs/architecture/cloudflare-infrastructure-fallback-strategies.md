# Cloudflare Infrastructure Fallback Strategies

## Database Resilience Framework

**D1 Database Fallback Architecture:**

```typescript
// lib/db/resilience-manager.ts
export class CloudflareDatabaseFallbackManager {
  private readonly readReplicas: Database[];
  private readonly cacheLayer: CloudflareCache;
  private readonly fallbackTimeout = 5000; // 5s timeout

  async executeWithFallback<T>(
    operation: (db: Database) => Promise<T>,
    cacheKey?: string
  ): Promise<T> {
    // Try primary database first
    try {
      const result = await this.executeWithTimeout(
        () => operation(this.primaryDatabase),
        this.fallbackTimeout
      );

      // Cache successful result
      if (cacheKey && result) {
        await this.cacheLayer.put(cacheKey, JSON.stringify(result), {
          expirationTtl: 300, // 5 minutes
        });
      }

      return result;
    } catch (primaryError) {
      console.warn("Primary database failed:", primaryError);

      // Try read replicas
      for (const replica of this.readReplicas) {
        try {
          const result = await this.executeWithTimeout(
            () => operation(replica),
            this.fallbackTimeout
          );

          console.log("Using database replica fallback");
          return result;
        } catch (replicaError) {
          console.warn("Replica failed:", replicaError);
        }
      }

      // Try cache fallback
      if (cacheKey) {
        try {
          const cached = await this.cacheLayer.get(cacheKey);
          if (cached) {
            console.log("Using cache fallback");
            return JSON.parse(cached);
          }
        } catch (cacheError) {
          console.warn("Cache fallback failed:", cacheError);
        }
      }

      throw new DatabaseUnavailableError("All database fallbacks exhausted");
    }
  }

  private async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Operation timeout")), timeout)
      ),
    ]);
  }
}
```

**Cache API Fallback Strategy:**

```typescript
// lib/cache/fallback-cache.ts
export class FallbackCacheManager {
  private readonly caches = {
    primary: caches.open("primary-cache"),
    secondary: caches.open("secondary-cache"),
    memory: new Map<string, { data: any; expires: number }>(),
  };

  async get(key: string): Promise<any> {
    // Try primary cache
    try {
      const primaryCache = await this.caches.primary;
      const response = await primaryCache.match(key);
      if (response) {
        return response.json();
      }
    } catch (error) {
      console.warn("Primary cache failed:", error);
    }

    // Try secondary cache
    try {
      const secondaryCache = await this.caches.secondary;
      const response = await secondaryCache.match(key);
      if (response) {
        console.log("Using secondary cache fallback");
        return response.json();
      }
    } catch (error) {
      console.warn("Secondary cache failed:", error);
    }

    // Try in-memory fallback
    const memoryItem = this.caches.memory.get(key);
    if (memoryItem && memoryItem.expires > Date.now()) {
      console.log("Using memory cache fallback");
      return memoryItem.data;
    }

    return null;
  }

  async put(
    key: string,
    data: any,
    options: { expirationTtl: number }
  ): Promise<void> {
    const response = new Response(JSON.stringify(data), {
      headers: {
        "Cache-Control": `max-age=${options.expirationTtl}`,
        "Content-Type": "application/json",
      },
    });

    // Store in multiple layers
    const promises = [
      // Primary cache
      this.caches.primary.then(cache => cache.put(key, response.clone())),

      // Secondary cache
      this.caches.secondary.then(cache => cache.put(key, response.clone())),

      // Memory cache
      Promise.resolve(
        this.caches.memory.set(key, {
          data,
          expires: Date.now() + options.expirationTtl * 1000,
        })
      ),
    ];

    // Don't wait for all to complete, fire and forget
    Promise.allSettled(promises).catch(console.warn);
  }
}
```

**Geographic Region Failover:**

```typescript
// lib/infrastructure/region-failover.ts
export class CloudflareRegionFailover {
  private readonly regions = [
    { name: "primary", endpoint: "https://api.gettravelvisa.com" },
    { name: "europe", endpoint: "https://eu.gettravelvisa.com" },
    { name: "asia", endpoint: "https://asia.gettravelvisa.com" },
    { name: "americas", endpoint: "https://us.gettravelvisa.com" },
  ];

  async executeWithRegionFailover<T>(
    operation: (endpoint: string) => Promise<T>
  ): Promise<T> {
    let lastError: Error | null = null;

    for (const region of this.regions) {
      try {
        console.log(`Attempting operation on ${region.name} region`);
        const result = await this.executeWithTimeout(
          () => operation(region.endpoint),
          10000 // 10s timeout
        );

        if (region.name !== "primary") {
          console.warn(`Using ${region.name} region as fallback`);
        }

        return result;
      } catch (error) {
        lastError = error as Error;
        console.warn(`${region.name} region failed:`, error);
      }
    }

    throw new RegionFailoverError("All regions exhausted", lastError);
  }

  private async executeWithTimeout<T>(
    operation: () => Promise<T>,
    timeout: number
  ): Promise<T> {
    return Promise.race([
      operation(),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Region timeout")), timeout)
      ),
    ]);
  }
}
```

**Image Optimization Fallback:**

```typescript
// lib/images/fallback-optimization.ts
export class ImageOptimizationFallback {
  private readonly strategies = [
    this.useCloudflareImages,
    this.useStaticImages,
    this.usePlaceholderImages,
  ];

  async getOptimizedImage(
    src: string,
    options: { width: number; height: number; quality?: number }
  ): Promise<string> {
    for (const strategy of this.strategies) {
      try {
        const optimizedSrc = await strategy.call(this, src, options);
        if (optimizedSrc) {
          return optimizedSrc;
        }
      } catch (error) {
        console.warn("Image optimization strategy failed:", error);
      }
    }

    // Last resort - return original
    return src;
  }

  private async useCloudflareImages(
    src: string,
    options: { width: number; height: number; quality?: number }
  ): Promise<string> {
    // Primary Cloudflare Image Optimization
    const params = new URLSearchParams({
      width: options.width.toString(),
      height: options.height.toString(),
      quality: (options.quality || 85).toString(),
      format: "webp",
    });

    return `/cdn-cgi/image/${params.toString()}/${src}`;
  }

  private async useStaticImages(
    src: string,
    options: { width: number; height: number; quality?: number }
  ): Promise<string> {
    // Fallback to pre-generated static images
    const staticImagePath = `/images/optimized/${options.width}x${options.height}/${src.replace(/[^a-zA-Z0-9.-]/g, "_")}`;

    // Check if static version exists
    try {
      const response = await fetch(staticImagePath, { method: "HEAD" });
      if (response.ok) {
        return staticImagePath;
      }
    } catch {
      // Static image doesn't exist
    }

    throw new Error("Static image not available");
  }

  private async usePlaceholderImages(
    src: string,
    options: { width: number; height: number; quality?: number }
  ): Promise<string> {
    // Generate placeholder image URL
    const placeholderService = `https://via.placeholder.com/${options.width}x${options.height}/e2e8f0/64748b?text=Image+Loading`;
    return placeholderService;
  }
}
```

**Deployment Rollback Automation:**

```typescript
// lib/deployment/rollback-manager.ts
export class DeploymentRollbackManager {
  async monitorDeploymentHealth(deploymentId: string): Promise<void> {
    const healthChecks = [
      this.checkResponseTimes,
      this.checkErrorRates,
      this.checkDatabaseConnectivity,
      this.checkCachePerformance,
    ];

    const healthResults = await Promise.allSettled(
      healthChecks.map(check => check.call(this))
    );

    const failures = healthResults.filter(
      result => result.status === "rejected"
    );

    if (failures.length > 1) {
      console.error("Multiple health checks failed, initiating rollback");
      await this.initiateRollback(deploymentId);
    }
  }

  private async checkResponseTimes(): Promise<void> {
    const endpoints = ["/api/health", "/d/ae", "/"];

    for (const endpoint of endpoints) {
      const start = Date.now();
      const response = await fetch(endpoint);
      const duration = Date.now() - start;

      if (duration > 3000 || !response.ok) {
        throw new Error(`Endpoint ${endpoint} health check failed`);
      }
    }
  }

  private async checkErrorRates(): Promise<void> {
    // Check Sentry error rates
    const errorRate = await this.getSentryErrorRate("5m");
    if (errorRate > 0.05) {
      // 5% error rate threshold
      throw new Error("Error rate exceeds threshold");
    }
  }

  private async initiateRollback(deploymentId: string): Promise<void> {
    console.log(`Initiating rollback for deployment ${deploymentId}`);

    // Trigger Cloudflare Pages rollback
    await this.cloudflareAPI.rollbackDeployment(deploymentId);

    // Update DNS to point to previous version if needed
    await this.updateDNSToStableVersion();

    // Notify team
    await this.sendRollbackNotification(deploymentId);
  }
}
```

These enhancements address all the remaining checklist recommendations by providing comprehensive accessibility testing integration, detailed edge case handling for complex visa eligibility scenarios, and robust fallback strategies for critical Cloudflare infrastructure dependencies.

---
