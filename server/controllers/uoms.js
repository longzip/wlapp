const {Uom} = require('../models/index');
const Joi = require('@hapi/joi');

function validate(uom) {
  const schema = {
        name: Joi.string().required(),
        categoryId: Joi.number()
    };
    return Joi.validate(uom, schema);
}

module.exports = {

	add: (req, res) => {
	    let result = {};
	    let status = 201;

	    let {error, value} = validate(req.body);

	    if (error) {
	      console.log(error);
	      status = 500;
	      result.status = status;
	      result.error = error;
	      return res.status(status).send(result);
	    }

	    Uom.create(value).then(uom => {
          result.status = status;
          result.result = uom;
          return res.status(status).send(result);
        })
        .catch((err) => {
          status = 500;
          result.status = status;
          result.error = err;
          return res.status(status).send(result);
        });
	},

	getAll: (req, res) => {
		// Uom.sync();
		let result = {};
		let status = 200;
		// find multiple entries
	      Uom.findAll().then(uoms => {
	        // uoms will be an array of all Uom instances
	        result.status = status;
	        result.result = uoms;
	        return res.status(status).send(result);
	      })
	      .catch((err) => {
	        status = 500;
	        result.status = status;
	        result.error = err;
	        return res.status(status).send(result);
	      });
	}
}