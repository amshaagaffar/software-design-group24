const express = require('express');
const router = express.Router();
const { getVolunteerHistory, addVolunteerHistory } = require('../controllers/volunteerHistoryController');

// Define routes
router.get('/:volunteerId', getVolunteerHistory);   // GET route to fetch history
router.post('/', addVolunteerHistory);              // POST route to add history

module.exports = router;
