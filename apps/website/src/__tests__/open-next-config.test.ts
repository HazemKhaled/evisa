import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import queueCache from "@opennextjs/cloudflare/overrides/queue/queue-cache";
import d1NextTagCache from "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache";
import fs from "fs";
import path from "path";

import rawConfig from "../../open-next.config";

// Jest resolves `@opennextjs/cloudflare` to a mock, so the value handed back is
// the plain object the config passed in rather than the package's resolved type.
const config = rawConfig as unknown as Record<string, unknown>;

jest.mock("@opennextjs/cloudflare", () => ({
  defineCloudflareConfig: jest.fn((value: unknown) => value),
}));

jest.mock(
  "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache",
  () => ({ __esModule: true, default: { name: "r2-incremental-cache" } })
);
jest.mock(
  "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache",
  () => ({
    __esModule: true,
    withRegionalCache: jest.fn((cache, opts) => ({
      name: "regional-cache",
      cache,
      opts,
    })),
  })
);
jest.mock("@opennextjs/cloudflare/overrides/queue/do-queue", () => ({
  __esModule: true,
  default: { name: "do-queue" },
}));
jest.mock("@opennextjs/cloudflare/overrides/queue/queue-cache", () => ({
  __esModule: true,
  default: jest.fn((queue, opts) => ({ name: "queue-cache", queue, opts })),
}));
jest.mock(
  "@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache",
  () => ({ __esModule: true, default: { name: "d1-next-tag-cache" } })
);

describe("open-next.config", () => {
  it("wraps the R2 incremental cache in a long-lived regional cache", () => {
    expect(withRegionalCache).toHaveBeenCalledTimes(1);
    expect(withRegionalCache).toHaveBeenCalledWith(r2IncrementalCache, {
      mode: "long-lived",
    });
    expect(config.incrementalCache).toMatchObject({
      name: "regional-cache",
      cache: r2IncrementalCache,
    });
  });

  it("wraps the Durable Object queue in a cache with the documented TTL", () => {
    expect(queueCache).toHaveBeenCalledTimes(1);
    expect(queueCache).toHaveBeenCalledWith(doQueue, {
      regionalCacheTtlSec: 5,
    });
    expect(config.queue).toMatchObject({ name: "queue-cache", queue: doQueue });
  });

  it("leaves the lazy-update and tag-cache-bypass options at their defaults", () => {
    const [, regionalCacheOptions] = (withRegionalCache as jest.Mock).mock
      .calls[0];
    const [, queueCacheOptions] = (queueCache as jest.Mock).mock.calls[0];

    expect(regionalCacheOptions).not.toHaveProperty(
      "shouldLazilyUpdateOnCacheHit"
    );
    expect(regionalCacheOptions).not.toHaveProperty("bypassTagCacheOnCacheHit");
    expect(queueCacheOptions).not.toHaveProperty("waitForQueueAck");
  });

  it("keeps the D1 tag cache and cache interception enabled", () => {
    expect(config.tagCache).toBe(d1NextTagCache);
    expect(config.enableCacheInterception).toBe(true);
    expect(defineCloudflareConfig).toHaveBeenCalledTimes(1);
  });

  it("includes the D1 revalidations stale/expire schema migrations", () => {
    const migrationsDir = path.resolve(__dirname, "../../migrations");
    const createSql = fs.readFileSync(
      path.join(migrationsDir, "0000_create_revalidations.sql"),
      "utf-8"
    );
    const alterSql = fs.readFileSync(
      path.join(
        migrationsDir,
        "0001_add_stale_and_expire_to_revalidations.sql"
      ),
      "utf-8"
    );

    expect(createSql).toContain("CREATE TABLE IF NOT EXISTS revalidations");
    expect(createSql).toContain("stale INTEGER");
    expect(createSql).toContain("expire INTEGER default NULL");
    expect(alterSql).toContain(
      "ALTER TABLE revalidations ADD COLUMN stale INTEGER;"
    );
    expect(alterSql).toContain(
      "ALTER TABLE revalidations ADD COLUMN expire INTEGER default NULL;"
    );
  });
});
