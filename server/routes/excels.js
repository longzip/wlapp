const controller = require('../controllers/excels');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
  router.route('/excels')
  	.post(validateToken, controller.save)
    .get(validateToken, controller.read);
};