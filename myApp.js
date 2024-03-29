let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

const absolutePathPublic = __dirname + '/public';
app.use('/public', express.static(absolutePathPublic));

const absolutePathIndex = __dirname + '/views/index.html';
console.log('Hello World');
app.get('/', function (req, res) {
  res.sendFile(absolutePathIndex);
});

app.get('/json', function (req, res) {
  const messageString = 'Hello json';
  let messageStyle = process.env.MESSAGE_STYLE;
  let newString = messageStyle === 'uppercase' ? messageString.toUpperCase() : messageString;
  res.json({ message: newString });
});

app.get(
  '/now',
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get('/:word/echo', function (req, res) {
  res.json({ echo: req.params.word });
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(urlencodedParser);

app
  .route('/name')
  .get(function (req, res) {
    res.json({ name: req.query.first + ' ' + req.query.last });
  })
  .post(urlencodedParser, function (req, res) {
    res.json({ name: req.body.first + ' ' + req.body.last });
  });

module.exports = app;
