const express = require('express');
const router = express.Router();
const Group = require('../models/Group.js');

router.get('/', (req, res, next) => {
  Group.find((err, rooms) => {
    if (err) return next(err);
    res.json(rooms);
  });
});

router.get('/:id', (req, res, next) => {
  Group.findById(req.params.id, (err, room) => {
    if (err) return next(err);
    res.json(room);
  });
});

router.post('/', (req, res, next) => {
  Group.create(req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.put('/:id', (req, res, next) => {
  Group.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', (req, res, next) => {
  Group.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
