const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');

router.get('/', (req, res, next) => {
  Message.find((err, rooms) => {
    if (err) return next(err);
    res.json(rooms);
  });
});

router.get('/:id', (req, res, next) => {
  Message.findById(req.params.id, (err, room) => {
    if (err) return next(err);
    res.json(room);
  });
});

router.post('/', (req, res, next) => {
  Message.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  Message.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Message.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
