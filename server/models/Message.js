const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
  chat: { type: Schema.Types.ObjectId, ref: 'Chat'},
  message: String,
  created_date: { type: Date, default: Date.now },
  isOwnMessage: { type: Boolean, default: true },
  person: { type: Schema.Types.ObjectId, ref: 'Person'}
});

module.exports = mongoose.model('Message', MessageSchema);
