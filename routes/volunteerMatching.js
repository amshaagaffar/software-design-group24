const express = require('express');
const router = express.Router();
const { matchVolunteersToEvent } = require('../controllers/volunteerMatchingController');

// Define route to match volunteers
router.get('/:eventId', matchVolunteersToEvent);

module.exports = router;
