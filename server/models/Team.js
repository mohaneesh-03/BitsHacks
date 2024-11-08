const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' },
  teamName: String,
  members: [{ name: String, linkedin: String }]
});

module.exports = mongoose.model('Team', teamSchema);
