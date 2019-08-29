const controller = require('../controllers/orders');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/orders')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/orders/:id')
    .get(controller.show)
    .put(controller.update);
  router.route('/orders/import')
    .post(controller.import);
};