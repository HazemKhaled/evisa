// Mock for @opennextjs/cloudflare module to avoid Jest ES module issues

export const getCloudflareContext = jest.fn().mockResolvedValue({
  env: {
    DB: {
      prepare: jest.fn().mockReturnValue({
        all: jest.fn().mockResolvedValue([]),
        get: jest.fn().mockResolvedValue(null),
        run: jest.fn().mockResolvedValue({ success: true }),
      }),
    },
  },
});

const opennextjsCloudflare = {
  getCloudflareContext,
};

export default opennextjsCloudflare;
