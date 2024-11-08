const express = require('express');
const { createHackathon, getHackathons } = require('../controllers/hackathonController');
const router = express.Router();

router.post('/create', createHackathon);
router.get('/', getHackathons);

module.exports = router;
