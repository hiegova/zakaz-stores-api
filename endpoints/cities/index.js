const getCities = require('./getCities');

function cities(app) {
  app.get('/cities', getCities);
}

module.exports = cities;
