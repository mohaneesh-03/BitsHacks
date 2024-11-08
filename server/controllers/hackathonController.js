const Hackathon = require('../models/Hackathon');

// Create Hackathon
exports.createHackathon = async (req, res) => {
  try {
    const hackathon = new Hackathon(req.body);
    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Hackathons
exports.getHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find();
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
