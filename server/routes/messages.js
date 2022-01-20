const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');
const { buildLinkExpandMessage } = require('../utils/messages-util.js');

router.post('/linkexpand', async (req, res, next) => {
  const link = req.body.link;
  const person = req.body.personId;
  const chat = req.body.chatId;

  try {
    let builtMessage = await buildLinkExpandMessage(link);
    let fullMessage = { message: builtMessage,
                      person,
                      chat };
    Message.create(fullMessage)
      .then(message => {
        return res.json(message);
      }).catch(e => {
        return next(e);
      });

  } catch(e) {
    return next(e);
  }
});

router.get('/', (req, res, next) => {
  Message.find((err, rooms) => {
    if (err) return next(err);
    return res.json(rooms);
  });
});

router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id, (err, room) => {
    if (err) return next(err);
    return res.json(room);
  });
});

router.post('/', (req, res, next) => {
  Message.create(req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  Message.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Message.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    return res.json(post);
  });
});

module.exports = router;
