import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

const config = {
  meta: {
    title: 'Archetype',
    description: '',
    keywords: 'api'
  },
  axios: {
    // baseURL: publicRuntimeConfig.API_BASE_URL,
    timeout: parseInt(publicRuntimeConfig.API_TIMEOUT)
  },
  firebase: {
    apiKey: publicRuntimeConfig.FIREBASE_KEY,
    authDomain: publicRuntimeConfig.FIREBASE_DOMAIN,
    projectId: publicRuntimeConfig.FIREBASE_PROJECT_ID,
    storageBucket: publicRuntimeConfig.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: publicRuntimeConfig.FIREBASE_SENDER_ID,
    appId: publicRuntimeConfig.FIREBASE_APP_ID,
    measurementId: publicRuntimeConfig.FIREBASE_MEASUREMENT_ID
  },
  stripe: {
    key: publicRuntimeConfig.STRIPE_KEY
  },
  google_analytics: publicRuntimeConfig.GOOGLE_ANALYTICS,
  google_tag_manager: publicRuntimeConfig.GOOGLE_TAG_MANAGER,
  clearbit: publicRuntimeConfig.CLEARBIT,
  apiUrls: {
    test: 'https://test.archetype.dev/v1/',
    production: 'https://api.archetype.dev/v1/',
    base: process.env.NEXT_PUBLIC_API_BASE
  }
};

export default config;
