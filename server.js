const http = require('http');
const { connectToDb } = require('./db.js');
const handleApi = require('./endpoints/handler');

const port = 3001;
const server = new http.Server();

(async function start() {
  try {
    await connectToDb();

    server.listen(port, '127.0.0.1');
    console.log(`API server started at localhost:${port}`);
  } catch (err) {
    console.log('ERROR:', err);
  }
})();

server.on('request', (req, res) => {
  handleApi(req, res);
});
