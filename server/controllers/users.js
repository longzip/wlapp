const db = require('../models/index');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const environment = process.env.NODE_ENV;
const stage = require('../config')[environment];

module.exports = {

  add: (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    
    let result = {};
    let status = 201;

    bcrypt.hash(password, stage.saltingRounds, function(err, hash) {
      if (err) {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      } else {
        password = hash;
        // User.destroy({ where: { } });
        // User.sync();

        User.create({ name, password, username, email }).then(user => {
          result.status = status;
          result.result = user;
          return res.status(status).send(result);
        })
        .catch((err) => {
          status = 500;
          result.status = status;
          result.error = err;
          return res.status(status).send(result);
        });
      }
    });
  },

  getAll: (req, res) => {
    let result = {};
    let status = 200;

    const payload = req.decoded;
    // TODO: Log the payload here to verify that it's the same payload
    //  we used when we created the token
    // console.log('PAYLOAD', payload);
    if (payload && payload.user !== 'admin') {
      // find multiple entries
      User.findAll().then(users => {
        // users will be an array of all User instances
        result.status = status;
        result.result = users;
        return res.status(status).send(result);
      })
      .catch((err) => {
        status = 500;
        result.status = status;
        result.error = err;
        return res.status(status).send(result);
      });

    } else {
      status = 401;
      result.status = status;
      result.error = `Authentication error`;
      res.status(status).send(result);
    }
  },

  login: (req, res) => {
    let result = {};
    let status = 200;
    const { username, password } = req.body;
    console.log(req.body);

    User.findOne({ where: {username}})
    .then(user => {
      // We could compare passwords in our model instead of below as well
      bcrypt.compare(password, user.password).then(match => {
        if (match) {
          status = 200;
          // Create a token
          const payload = { user: user.name };
          const options = { expiresIn: '2d', issuer: 'https://woodsland.com.vn' };
          const secret = process.env.JWT_SECRET;
          const token = jwt.sign(payload, secret, options);

          // console.log('TOKEN', token);
          result.token = token;
          result.status = status;
          result.result = user;
        } else {
          status = 401;
          result.status = status;
          result.error = `Authentication error`;
        }
        res.status(status).send(result);
      }).catch(err => {
        status = 500;
        result.status = status;
        result.error = err;
        res.status(status).send(result);
      });
    })
    .catch((err) => {
      status = 500;
      result.status = status;
      result.error = err;
      res.status(status).send(result);
    });
  }
}