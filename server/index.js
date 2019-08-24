require('dotenv').config(); // Sets up dotenv as soon as our application starts
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require( "./config" );
const sql = require('mssql')
const path = require('path');
const Joi = require('@hapi/joi');
const router = express.Router();

const environment = process.env.NODE_ENV; // development
const stage = require('./config')[environment];

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// This is equivalent to
app.use('/', bodyParser.json());

if (environment !== 'production') {
  app.use(logger('dev'));
  // and this
  app.use('/', logger('dev'));
}

if (environment !== 'production') {
  app.use(logger('dev'));
}

// Here, we've specified the pattern we'd like to be matched from our request's uri
app.use('/api/v1', (req, res, next) => {
  res.send('Hello');
  // We call next to hand execution over to the next middleware
  next();
});

const routes = require('./routes/index.js');

app.use('/api/v1', routes(router));

// const posts = require('./routes/api/posts');
// const uoms = require('./routes/api/uoms');
// const materials = require('./routes/api/materials');
// const readexcel = require('./routes/api/readexcel');

// app.use('/api/posts', posts);
// app.use('/api/uoms', uoms);
// app.use('/api/materials', materials);
// app.use('/api/readexcel', readexcel);

// Handle production
// if (process.env.NODE_ENV === 'production') {
//   // Static folder
//   app.use(express.static(__dirname + '/public/'));

//   // Handle SPA
//   app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }
// app.use(express.static(path.join(__dirname , '../client/build/')));
// app.get('/.*/', (req, res) => res.sendFile(path.join(__dirname , '../client/build/index.html')));

// sql.on('error', err => {
//   console.log(err);
// })



// const schema = Joi.object().keys({
//   username: Joi.string().alphanum().min(3).max(30).required(),
//   password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
//   access_token: [Joi.string(), Joi.number()],
//   birthyear: Joi.number().integer().min(1900).max(2013),
//   email: Joi.string().email({ minDomainSegments: 2 })
// }).with('username', 'birthyear').without('password', 'access_token');

// const result = Joi.validate({ username: 'abc', birthyear: 1994 }, schema);
// console.dir(result);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));