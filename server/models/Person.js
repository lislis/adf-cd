const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  created_date: { type: Date, default: Date.now },
  isOwnMessage: { type: Boolean, default: true },
  chat: { type: Schema.Types.ObjectId, ref: 'Chat' }
});

module.exports = mongoose.model('Person', PersonSchema);
