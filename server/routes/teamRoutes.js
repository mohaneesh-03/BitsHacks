const express = require('express');
const { createTeam, getTeams } = require('../controllers/teamController');
const router = express.Router();

router.post('/create', createTeam);
router.get('/:hackathonId', getTeams);

module.exports = router;
