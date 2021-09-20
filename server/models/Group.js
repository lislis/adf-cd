const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { type: String},
  created_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);
