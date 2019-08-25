const users = require('./users');
const uoms = require('./uoms');

module.exports = (router) => {
  users(router);
  uoms(router);
  return router;
};