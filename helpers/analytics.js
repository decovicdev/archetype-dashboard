import config from '../config';

const $analytics = {
  page: (path) => {
    window.gtag('config', config.google_analytics, {
      page_path: path
    });
  },
  event: ({ action, params }) => {
    window.gtag('event', action, params);
  },
  identify: () => {}
};

export default $analytics;
