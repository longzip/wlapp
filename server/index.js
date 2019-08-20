const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
const readexcel = require('./routes/api/readexcel');

app.use('/api/posts', posts);
app.use('/api/readexcel', readexcel);

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'));

  // Handle SPA
  app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));