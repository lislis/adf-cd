const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat.js');
const Message = require('../models/Message.js');
const Person = require('../models/Person.js');

router.get('/', (req, res, next) => {
  Chat.find((err, chats) => {
    if (err) return next(err);
    res.json(chats);
  });
});

router.get('/:id', (req, res, next) => {
  Promise.all([
    Chat.findById(req.params.id).exec(),
    Person.find({ chat: req.params.id}).exec()
  ]).then(values => {
    res.json.values();
  }).catch(e => req.logger.error(e));
});

router.get('/:id/messages', (req, res, next) => {
  Promise.all([
    Chat.findById(req.params.id).exec(),
    Message.find({chat: req.params.id}).exec(),
    Person.find({ chat: req.params.id}).exec()
  ]).then(values => {
    res.json(values);
  }).catch(e => req.logger.error(e));
});

router.post('/', (req, res, next) => {
  Chat.create(req.body, (err, chat) => {
    if (err) return next(err);
    res.json(chat);
  });
});

router.put('/:id', (req, res, next) => {
  Chat.findByIdAndUpdate(req.params.id, req.body, (err, chat) => {
    if (err) return next(err);
    res.json(chat);
  });
});

router.delete('/:id', (req, res, next) => {
  Chat.findByIdAndRemove(req.params.id, req.body, (err, chat) => {
    if (err) return next(err);
    res.json(chat);
  });
});

module.exports = router;
