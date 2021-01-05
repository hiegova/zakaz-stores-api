const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url = 'mongodb://localhost:27017';
  const client = new MongoClient(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  await client.connect();

  console.log('Connected to MongoDB /zakaz at', url);

  db = client.db('zakaz');
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
