const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    name: String,
    passowrd: String,
    email: String,
    hackathonid: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hackathon' }],
    teamid: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
  })
  module.exports = mongoose.model('Student', studentSchema);