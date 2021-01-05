'use strict';

const fetch = require('node-fetch');
const { connectToDb, getDb } = require('./db');

const rootUrl = 'https://stores-api.test.zakaz.ua';

async function getChains() {
  const res = await fetch(`${rootUrl}/retail_chains/`);
  const json = await res.json();

  return json.map((ch) => ({ id: ch.id }));
}

async function getStoresByChain(chainId) {
  const res = await fetch(`${rootUrl}/stores/`, {
    headers: {
      'x-chain': chainId,
      'x-version': '8',
      'Accept-Language': 'en',
    },
  });

  const json = await res.json();

  return json.map((s) => ({
    id: s.id,
    name: s.name,
    chain: chainId,
    city: s.city,
  }));
}

async function getCitiesByChain(chainId, language) {
  const res = await fetch(`${rootUrl}/cities/`, {
    headers: {
      'x-chain': chainId,
      'Accept-Language': language,
    },
  });

  const json = await res.json();

  return json.map((s) => ({
    name: s.id,
    trans: s.name,
    language,
  }));
}

async function updateChains() {
  const actualChains = await getChains();

  if (!actualChains || !Array.isArray(actualChains) || !actualChains.length) {
    console.log('No chains were received');
    return;
  }

  const db = getDb();
  const currentChains = await db.collection('chains');
  await currentChains.deleteMany();

  try {
    await currentChains.insertMany(actualChains);
    console.log('Chains updated');
  } catch (err) {
    console.log('ERROR (updateChains):', err);
  }
}

async function updateStores() {
  const db = getDb();
  const chains = await db.collection('chains').find().toArray();
  const actualStores = [];

  const promises = chains.map(async (chain) => {
    const chainStores = await getStoresByChain(chain.id);

    if (chainStores.length) {
      actualStores.push(...chainStores);
    }
  });

  await Promise.all(promises);

  if (!actualStores.length) {
    console.log('No stores were received');
    return;
  }

  const dbStores = await db.collection('stores');
  await dbStores.deleteMany();

  try {
    await dbStores.insertMany(actualStores);
    console.log('Stores updated');
  } catch (err) {
    console.log('ERROR: (updateStores)', err);
  }
}

async function updateCities() {
  const db = getDb();
  const chains = await db.collection('chains').find().toArray();
  const actualCities = [];
  const languages = ['en', 'ru', 'uk'];

  for (const lang of languages) {
    const promises = chains.map(async (chain) => {
      const chainStores = await getCitiesByChain(chain.id, lang);

      if (chainStores.length) {
        actualCities.push(...chainStores);
      }
    });

    await Promise.all(promises);
  }

  if (!actualCities.length) {
    console.log('No stores were received');
    return;
  }

  const translationsMap = actualCities.reduce((result, city) => {
    result[city.name] = {
      ...result[city.name],
      [city.language]: city.trans,
    };

    return result;
  }, {});

  const translationsArray = [];
  for (const key in translationsMap) {
    translationsArray.push({ key, translations: translationsMap[key] });
  }

  const dbTranslations = await db.collection('translations');
  await dbTranslations.deleteMany();

  try {
    await dbTranslations.insertMany(translationsArray);
    console.log('Cities updated');
  } catch (err) {
    console.log('ERROR: (updateCities)', err);
  }
}

(async function start() {
  try {
    await connectToDb();
    await updateChains();
    await updateStores();
    await updateCities();

    console.log('🚀 database fetching completed');
  } catch (err) {
    console.log('ERROR: (main)', err);
  }
})();
