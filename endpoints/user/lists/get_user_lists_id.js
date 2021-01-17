const { getDb } = require('../../../db');

async function get_user_lists_id(req, res) {
  const db = getDb();
  const { list_id } = req.params;

  const user = await db.collection('users').findOne({ user_id: 1 });
  const list = user.lists.find((l) => l.id === list_id);

  if (!user || !list) {
    res.sendStatus(400);
    return;
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(list));
}

module.exports = get_user_lists_id;
