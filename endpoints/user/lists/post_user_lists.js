const hash = require('object-hash');
const bodyParser = require('body-parser');
const { getDb } = require('../../../db');

async function post_user_lists(req, res) {
  console.log('req: ', req.body);
  const db = getDb();

  const user = await db.collection('users').findOne({ user_id: 1 });

  if (!user) {
    res.sendStatus(400);
  }

  // const newList = {
  //   items: 
  // }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user.lists || []));
}

module.exports = post_user_lists;
