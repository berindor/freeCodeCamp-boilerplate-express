let express = require('express');
let app = express();

const absolutePathPublic = __dirname + '/public';
app.use('/public', express.static(absolutePathPublic));

const absolutePathIndex = __dirname + '/views/index.html';
console.log('Hello World');
app.get('/', function (req, res) {
  res.sendFile(absolutePathIndex);
});

app.get('/json', function (req, res) {
  res.json({ message: 'Hello json' });
});

module.exports = app;
