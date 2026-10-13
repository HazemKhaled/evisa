/**
 * Mock for @opennextjs/cloudflare.
 * The package ships ESM that Jest cannot load, and `apps/website/jest.config.ts`
 * maps the bare specifier here.
 */

export const defineCloudflareConfig = jest.fn(value => value);

export const initOpenNextCloudflareForDev = jest.fn();

export const getCloudflareContext = jest.fn(() => ({
  env: {},
  cf: {},
  ctx: { waitUntil: jest.fn(), passThroughOnException: jest.fn() },
}));
