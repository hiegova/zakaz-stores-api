const { getDb } = require('../db');

function cities(app) {
  app.get('/cities', citiesHandler);
}
async function citiesHandler(req, res) {
  const db = getDb();
  const chain = req.headers['x-chain'];
  const language = req.headers['accept-language'] || 'en';

  const stores = await db.collection('stores').find({ chain }).toArray();

  const uniqueCities = stores
    .map((s) => s.city)
    .reduce((unique, curr) => {
      return unique.includes(curr) ? unique : [...unique, curr];
    }, []);

  const responseCities = [];

  for (const key of uniqueCities) {
    const cityWithTrans = await db.collection('translations').findOne({ key });

    responseCities.push({
      id: key,
      name: cityWithTrans.translations[language],
    });
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(responseCities));
}

module.exports = cities;
