const { getDb } = require('../../../db');

async function get_user_lists(req, res) {
  const db = getDb();

  const user = await db.collection('users').findOne({ user_id: 1 });

  if (!user) {
    res.sendStatus(400);
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user.lists || []));
}

module.exports = get_user_lists;
