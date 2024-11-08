const Team = require('../models/Team');

// Create Team
exports.createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get Teams by Hackathon
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find({ hackathonId: req.params.hackathonId });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
