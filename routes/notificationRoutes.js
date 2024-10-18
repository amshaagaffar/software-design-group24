const express = require('express');
const router = express.Router();

// Example notification route
router.get('/notifications', (req, res) => {
    // Hardcoded notification data
    const notifications = [
        { id: 1, message: "You have a new event invitation." },
        { id: 2, message: "Your profile is incomplete, please update it." }
    ];

    res.json(notifications);
});

module.exports = router;