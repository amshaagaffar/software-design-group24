const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const userProfileController = require('../controllers/userProfileController'); // Import the user profile controller
const eventController = require('../controllers/eventController'); // Import the event controller
const path = require('path');

// Serve the login page
router.get('/login', loginController.serveLoginPage);

// Route to get all users
router.get('/users', loginController.getAllUsers);

// Registration route
router.post('/users', loginController.registerUser);

// Login route
router.post('/users/login', loginController.loginUser);

// Route to get volunteer history using JWT authentication
router.get('/volunteerhistory', loginController.authenticateJWT, loginController.getVolunteerHistory);

// Routes using JWT authentication
router.get('/admin_dashboard.html', loginController.authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'admin_dashboard.html'));
});

router.get('/user_dashboard.html', loginController.authenticateJWT, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'user_dashboard.html'));
});

// Route to create or update user profile
router.post('/userprofile', loginController.authenticateJWT, userProfileController.createOrUpdateUserProfile);

// Route to get user profile
router.get('/userprofile', loginController.authenticateJWT, userProfileController.getUserProfile);

// Create an event
router.post('/api/events', eventController.createEvent);

// Get all events
router.get('/api/events', eventController.getAllEvents);

// Other event-related routes (get, update, delete)
router.get('/api/events/:id', eventController.getEventById);
router.put('/api/events/:id', eventController.updateEvent);
router.delete('/api/events/:id', eventController.deleteEvent);
router.get('/getRole', loginController.authenticateJWT, loginController.getUserRole);

module.exports = router;
