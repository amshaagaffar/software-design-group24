const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController'); // Import the controller

// Serve the login page
router.get('/login', loginController.serveLoginPage);

// Route to get all users
router.get('/users', loginController.getAllUsers);

// Registration route
router.post('/users', loginController.registerUser);

// Login route
router.post('/users/login', loginController.loginUser);

module.exports = router; // Export the router