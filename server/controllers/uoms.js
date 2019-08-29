const {Uom} = require('../models/index');
const Joi = require('@hapi/joi');
const {Op} = require('sequelize');
const moment = require('moment');

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

	show: (req, res) => {
		let result = {};
		let status = 200;

		Uom.findByPk(req.params.id)
		.then(uom => {
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
	
	import: (req, res) => {
		let result = {};
		let status = 200;
		// console.log(req.body);
		Uom.sync({
			force: true
		}).then(() => {
			Uom.bulkCreate(req.body)
			.then(affectedRows =>{
				result.status = status;
				result.result = affectedRows;
				return res.status(status).send(result);
			})
			.catch((err) => {
				status = 500;
				result.status = status;
				result.error = err;
				return res.status(status).send(result);
			});
		})
		.catch((err) => {
			status = 500;
			result.status = status;
			result.error = err;
			return res.status(status).send(result);
		});
	},

	update: (req, res) => {
		let result = {};
		let status = 201;
		
		let {error, value} = validate(req.body);

		Uom.update(value, 
			{
				where: 
				{
					id: req.params.id
				}
			}
		)
		.then(affectedRows =>{
			result.status = status;
			result.result = affectedRows;
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
		console.log(req.query.name)
		// find multiple entries
	      Uom.findAll({
			offset: req.query.offset || 0,
			limit: req.query.limit || 10,
			where: req.query.name ? {
				[Op.and]: [
				  {
					name: {
					  [Op.like]: '%' + req.query.name + '%'
					},
					createdAt: {
						[Op.lt]: moment(req.query.dateFinished),
						[Op.gt]: moment(req.query.dateStart)
					}
				  }
				]
			  } : {},
      		order: req.query.sort ? req.query.sort : [['createdAt', 'DESC']]
		  }).then(uoms => {
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