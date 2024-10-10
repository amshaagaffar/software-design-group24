const bcrypt = require('bcrypt');
const path = require('path');

// In-memory storage for users (you may move this to a database later)
const users = [];

// Serve the login page
exports.serveLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'Login.html')); // Adjust the path as needed
};

// Get all users
exports.getAllUsers = (req, res) => {
    res.json(users);
};


exports.registerUser = async (req, res) => {
    try {
        // Check if a user with the same email already exists
        const existingUser = users.find(user => user.email === req.body.email);
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Add role (admin or volunteer) to user data
        const user = { email: req.body.email, password: hashedPassword, role: req.body.role };
        users.push(user);
        res.redirect('/login'); // Redirect to login page after successful registration
    } catch {
        res.status(500).send();
    }
};


exports.loginUser = async (req, res) => {
    const user = users.find(user => user.email === req.body.email);
    if (user == null) {
        return res.status(400).send('Cannot find user');
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            if (user.role === 'admin') {
                res.redirect('/admin_dashboard.html'); // Redirect admin users
            } else {
                res.redirect('/user_dashboard.html'); // Redirect volunteer users
            }
        } else {
            res.send('Login Denied');
        }
    } catch {
        res.status(500).send();
    }
};