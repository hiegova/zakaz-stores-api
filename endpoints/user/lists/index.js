const get_user_lists = require('./get_user_lists');
const get_user_lists_id = require('./get_user_lists_id');
const post_user_lists = require('./post_user_lists');

function lists(app) {
  app.get('/user/lists', get_user_lists);
  app.get('/user/lists/:list_id', get_user_lists_id);
  app.post('/user/lists', post_user_lists);
}

module.exports = lists;
