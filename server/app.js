require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pino = require('pino');
const pinoHttp = require('pino-http')();

const app = express();
//const server = require('http').createServer(app);

const groups = require('./routes/groups');
const chats = require('./routes/chats');
const messages = require('./routes/messages');

const MONGO_DB = process.env['MONGO_DB'];
//const MONGO_PORT = process.env['MONGO_PORT'];
const MONGO_HOST = process.env['MONGO_HOST'];

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  mixin() {
    return { app: '[adf-cd-server]' }
  }
});

// connect to DB
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
logger.info(`[mongodb] mongodb://${MONGO_HOST}/${MONGO_DB}`);
mongoose.connect(`mongodb://${MONGO_HOST}/${MONGO_DB}`, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useUnifiedTopology: true })
        .then(() =>  logger.info('[mongodb] connection successful'))
        .catch((err) => logger.error(err));

// CORS
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors())

app.use(pinoHttp);
app.use(bodyParser.json({ limit: '1mb'}));
app.use(bodyParser.urlencoded({'extended':'false'}));

app.use('/api/groups', groups);
app.use('/api/chats', chats);
app.use('/api/messages', messages);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
