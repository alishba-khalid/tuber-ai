import { Polar } from "@polar-sh/sdk";

export const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN || 'polar_token_placeholder_key',
  // Automatically switch between sandbox (testing) and production servers
  server: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
});
