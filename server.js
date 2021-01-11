const express = require('express');
const { connectToDb } = require('./db.js');
const installRoutesHandlers = require('./endpoints/handler');

const app = express();

const port = 3001;

installRoutesHandlers(app);

(async function start() {
  try {
    await connectToDb();

    app.listen(port, () => {
      console.log(`🚀 API server started at http://localhost:${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
