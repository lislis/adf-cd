const express = require('express');
const router = express.Router();
const Group = require('../models/Group.js');
const Chat = require('../models/Chat.js');

router.get('/', (req, res, next) => {
  Group.find((err, groups) => {
    if (err) return next(err);
    res.json(groups);
  });
});

router.get('/:id', (req, res, next) => {
  Group.findById(req.params.id, (err, group) => {
    if (err) return next(err);
    res.json(group);
  });
});

router.get('/:id/chats', (req, res) => {
  Promise.all([
    Group.findById(req.params.id).exec(),
    Chat.find({group: req.params.id}).exec()
  ]).then(values => {
    res.json(values)
  }).catch(e => req.logger.error(e))
});

router.get('/name/:name', (req, res, next) => {
  Group.find({ name: req.params.name }, (err, group) => {
    if (err) return next(err);
    res.json(group);
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
