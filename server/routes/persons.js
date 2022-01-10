const express = require('express');
const router = express.Router();
const Chat = require('../models/Person.js');

router.get('/', (req, res, next) => {
  Person.find((err, persons) => {
    if (err) return next(err);
    res.json(persons);
  });
});

router.get('/:id', (req, res, next) => {
  Person.findById(req.params.id, (err, person) => {
    if (err) return next(err);
    res.json(person);
  });
});

router.post('/', (req, res, next) => {
  Person.create(req.body, (err, person) => {
    if (err) return next(err);
    res.json(person);
  });
});

router.put('/:id', (req, res, next) => {
  Person.findByIdAndUpdate(req.params.id, req.body, (err, person) => {
    if (err) return next(err);
    res.json(person);
  });
});

router.delete('/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id, req.body, (err, person) => {
    if (err) return next(err);
    res.json(person);
  });
});

module.exports = router;
