const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const UserCredentials = require('../models/UserCredentials'); // Import the user model

const SECRET_KEY = 'your_secret_key'; // Replace with a stronger secret key

// Serve the login page
exports.serveLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Login.html'));
};

// Get all users (optional, for testing)
exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserCredentials.find(); // Fetch users from MongoDB
        res.json(users);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const existingUser = await UserCredentials.findOne({ email: req.body.email }); // Check if user exists
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const user = new UserCredentials({
            email: req.body.email,
            password: req.body.password, // Password will be hashed in the model
            role: req.body.role
        });

        await user.save(); // Save the user to the database
        res.redirect('/login'); // Redirect to login page after successful registration
    } catch (err) {
        res.status(500).send(err);
    }
};

// Log in a user
exports.loginUser = async (req, res) => {
    try {
        const user = await UserCredentials.findOne({ email: req.body.email }); // Fetch user from MongoDB
        if (!user) {
            return res.status(400).send('Cannot find user');
        }

        if (await user.comparePassword(req.body.password)) { // Compare password using the method in the model
            const token = jwt.sign({ email: user.email, role: user.role, userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ message: 'Login successful', token: token, role: user.role });
        } else {
            res.send('Login Denied');
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

// Get volunteer history for a logged-in user
exports.getVolunteerHistory = (req, res) => {
    // Simulated data for demonstration; replace with database query results
    const volunteerHistory = [
        // Example volunteer history data
    ];
    res.json(volunteerHistory);
};

// Middleware to verify JWT token for protected routes
exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Token is invalid
            }
            req.user = user; // Store user info in the request object
            next(); // Proceed to the next middleware/route handler
        });
    } else {
        res.sendStatus(401); // No token found
    }
};

exports.getUserRole = (req, res) => {
    // Check if the user is authenticated by using the existing JWT token
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, SECRET_KEY);
            res.json({ role: decoded.role });
        } catch (err) {
            res.status(403).send('Invalid token');
        }
    } else {
        res.status(401).send('No token provided');
    }
};
