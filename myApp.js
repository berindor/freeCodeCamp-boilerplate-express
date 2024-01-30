let express = require('express');
let app = express();
require('dotenv').config();

const absolutePathPublic = __dirname + '/public';
app.use('/public', express.static(absolutePathPublic));

const absolutePathIndex = __dirname + '/views/index.html';
console.log('Hello World');
app.get('/', function (req, res) {
  res.sendFile(absolutePathIndex);
});

app.get('/json', function (req, res) {
  const messageString = 'Hello json';
  const newString = process.env.MESSAGE_STYLE === 'uppercase' ? messageString.toUpperCase() : messageString;
  res.json({ message: newString });
});

module.exports = app;
