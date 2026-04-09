const { onRequest } = require("firebase-functions/v2/https");
const app = require("./server");

exports.signer = onRequest(
  {
    region: "us-central1",
    timeoutSeconds: 120,
    memory: "512MiB",
    maxInstances: 5,
  },
  app
);
