const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });

    return config;
  }
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    [withImages],
    {
      webpack5: true,
      reactStrictMode: true,
      publicRuntimeConfig: {
        URL: process.env.URL,
        API_BASE_URL: process.env.API_BASE_URL,
        API_TIMEOUT: process.env.API_TIMEOUT,
        API_BASE: process.env.API_BASE,

        FIREBASE_KEY: process.env.FIREBASE_KEY,
        FIREBASE_DOMAIN: process.env.FIREBASE_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_SENDER_ID: process.env.FIREBASE_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,

        STRIPE_KEY: process.env.STRIPE_KEY,

        GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS,
        GOOGLE_TAG_MANAGER: process.env.GOOGLE_TAG_MANAGER
      }
    }
  ],
  nextConfig
);
