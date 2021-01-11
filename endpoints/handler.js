const cities = require('./cities');
const lists = require('./lists');

function initRoutesHandlers(app) {
  app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Zakaz stores API version 0.0.1\n');
  });

  cities(app);

  lists(app);

  // Final route
  app.use(function (req, res) {
    res.sendStatus(404);
  });
}

module.exports = initRoutesHandlers;
