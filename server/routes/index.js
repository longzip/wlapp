const users = require('./users');
const uoms = require('./uoms');
const excels = require('./excels');

module.exports = (router) => {
  users(router);
  uoms(router);
  excels(router);
  return router;
};