const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema({
  name: String,
  created_date: { type: Date, default: Date.now },
  group: { type: Schema.Types.ObjectId, ref: 'Group' }
});

module.exports = mongoose.model('Chat', ChatSchema);
