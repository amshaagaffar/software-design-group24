// #file:login.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

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

module.exports = router;