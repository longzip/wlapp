const { Production, Product, Bom } = require("../models/index");
const Joi = require("@hapi/joi");
const { Op } = require("sequelize");
const moment = require("moment");

function validate(data) {
  const schema = {
    name: Joi.string().required(),
    origin: Joi.string(),
    productQty: Joi.number(),
    productUom: Joi.string(),
    datePlannedStart: Joi.date(),
    datePlannedFinished: Joi.date(),
    dateStart: Joi.date(),
    dateFinished: Joi.date(),
    priority: Joi.number(),
    state: Joi.string(),
    availability: Joi.string(),
    ProductId: Joi.number(),
    BomId: Joi.number(),
    RoutingId: Joi.number()
  };
  return Joi.validate(data, schema);
}

module.exports = {
  delete: (req, res) => {
    let result = {};
    let status = 200;

    Production.findByPk(req.params.id)
      .then(item => {
        result.status = status;
        result.result = item.destroy();
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  add: (req, res) => {
    let result = {};
    let status = 201;

    let { error, value } = validate(req.body);

    if (error) {
      console.log(error);
      status = 500;
      result.status = status;
      result.error = error;
      return res.status(status).send(result);
    }

    Production.create(value)
      .then(item => {
        result.status = status;
        result.result = item;
        return res.status(status).send(result);
      })
      .catch(err => {
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
      .catch(err => {
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
    })
      .then(() => {
        Production.bulkCreate(req.body)
          .then(affectedRows => {
            result.status = status;
            result.result = affectedRows;
            return res.status(status).send(result);
          })
          .catch(err => {
            status = 500;
            result.status = status;
            result.error = err;
            return res.status(status).send(result);
          });
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  },

  update: (req, res) => {
    let result = {};
    let status = 201;

    let { error, value } = validate(req.body);

    Production.update(value, {
      where: {
        id: req.params.id
      }
    })
      .then(affectedRows => {
        result.status = status;
        result.result = affectedRows;
        return res.status(status).send(result);
      })
      .catch(err => {
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
    console.log(req.query.name);
    // find multiple entries
    Production.findAll({
      include: [{ model: Product }, { model: Bom }],
      offset: req.query.offset || 0,
      limit: req.query.limit || 0,
      where: req.query.name
        ? {
            [Op.and]: [
              {
                name: {
                  [Op.like]: "%" + req.query.name + "%"
                },
                createdAt: {
                  [Op.lte]:
                    moment(req.query.dateFinished).endOf("day") || moment(),
                  [Op.gte]:
                    moment(req.query.dateStart).startOf("day") ||
                    moment("2019-08-29")
                }
              }
            ]
          }
        : {},
      order: req.query.sort ? req.query.sort : [["createdAt", "DESC"]]
    })
      .then(uoms => {
        // uoms will be an array of all Uom instances
        result.status = status;
        result.result = uoms;
        return res.status(status).send(result);
      })
      .catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });
  }
};
