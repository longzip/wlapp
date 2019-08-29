const controller = require('../controllers/boms');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/boms')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/boms/:id')
    .get(controller.show)
    .put(controller.update);
  router.route('/boms/import')
    .post(controller.import);
};