const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  name: String,
  duration: String,
  type: String,
  teamsize: String,
  prizes: String,
  status: { type: String, enum: ['Open', 'Closed', 'Ongoing'], default: 'Open' }
});

module.exports = mongoose.model('Hackathon', hackathonSchema);
