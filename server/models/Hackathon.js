const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  rules: String,
  prizes: String,
  status: { type: String, enum: ['Open', 'Closed', 'Ongoing'], default: 'Open' }
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
