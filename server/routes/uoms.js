const controller = require('../controllers/uoms');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/uoms')
  	.post(validateToken, controller.add)
    .get(validateToken, controller.getAll);
};