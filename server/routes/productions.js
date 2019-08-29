const controller = require('../controllers/productions');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/productions')
  	.post(controller.add)
    .get(controller.getAll);
  router.route('/productions/:id')
    .get(controller.show)
    .put(controller.update);
  router.route('/productions/import')
    .post(controller.import);
};