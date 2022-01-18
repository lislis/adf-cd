const express = require('express');
const router = express.Router();
const Message = require('../models/Message.js');
const ogs = require('open-graph-scraper');

router.post('/linkexpand',async (req, res, next) => {
  const link = req.body.link;
  const p = req.body.personId;
  const c = req.body.chatId;

  const options = { url: link };

  try {
    const { error, result, response } =  await ogs(options);
    if (result.success) {
      console.log(result);

      let msg = `${result.ogTitle}<br>
<a href="${result.ogUrl}">${result.ogUrl}</a><br>
${result.ogDescription.slice(0, 80)}...<br>
<img src="${result.ogImage.url}" alt="" width="200">`;

      let fullMessage = { message: msg,
                          person: p,
                          chat: c };
      console.log(fullMessage);
      Message.create(fullMessage)
        .then(message => {
          return res.json(message);
        }).catch(e => {
          return next(e);
        });
    }
  } catch (e) {
    //req.logger.error("error fetching og meta data");
    return res.json({ success: false });
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
