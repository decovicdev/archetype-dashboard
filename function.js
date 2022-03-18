const functions = require('firebase-functions');
const { default: next } = require('next');

const server = next({
  dev: false,
  conf: { distDir: '.next' }
});

const handle = server.getRequestHandler();

exports.next = functions
  .runWith({ minInstances: 1 })
  .https.onRequest((req, res) => {
    return server.prepare().then(() => handle(req, res));
  });
