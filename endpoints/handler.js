const cities = require('./cities');

function handler(req, res) {
  switch (req.url) {
    case '/cities':
      return cities(req, res);

    default:
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Zakaz stores API version 0.0.1');

      return;
  }
}

module.exports = handler;
