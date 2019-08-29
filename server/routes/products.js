const controller = require('../controllers/products');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/products')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/products/:id')
    .get(controller.show)
    .put(controller.update);
  router.route('/products/import')
    .post(controller.import);
};