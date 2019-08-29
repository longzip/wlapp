const {Production} = require('../models/index');
const Joi = require('@hapi/joi');
const {Op} = require('sequelize');
const moment = require('moment');

function validate(data) {
  const schema = {
	name: Joi.string().required(),
    origin: Joi.string(),
    productId: Joi.number(),
    productQty: Joi.number(),
    productUomId: Joi.number(),
    datePlannedStart: Joi.date(),
    datePlannedFinished: Joi.date(),
    dateStart: Joi.date(),
    dateFinished: Joi.date(),
    bomId: Joi.number(),
    routingId: Joi.number(),
    createId: Joi.number(),
    userId: Joi.number(),
    priority: Joi.number(),
    state: Joi.string(),
    availability: Joi.string()
    };
    return Joi.validate(data, schema);
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

	    Production.create(value).then(item => {
          result.status = status;
          result.result = item;
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

		Production.findByPk(req.params.id)
		.then(item => {
			result.status = status;
			result.result = item;
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
		Production.sync({
			force: true
		}).then(() => {
			Production.bulkCreate(req.body)
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

		Production.update(value, 
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
	      Production.findAll({
			offset: req.query.offset || 0,
			limit: req.query.limit || 10,
			where: req.query.name ? {
				[Op.and]: [
				  {
					name: {
					  [Op.like]: '%' + req.query.name + '%'
					},
					createdAt: {
						[Op.lte]: moment(req.query.dateFinished).endOf('day') || moment(),
						[Op.gte]: moment(req.query.dateStart).startOf('day') || moment('2019-08-29')
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