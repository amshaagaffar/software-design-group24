const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');

const SECRET_KEY = 'your_secret_key'; // Replace with a stronger secret key

// In-memory storage for users (move this to a database later)
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
    if (!user) {
        return res.status(400).send('Cannot find user');
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            // Create a JWT token
            const token = jwt.sign({ email: user.email, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

            // Send the JWT token and user role in the response
            res.json({ message: 'Login successful', token: token, role: user.role });
        } else {
            res.send('Login Denied');
        }
    } catch {
        res.status(500).send();
    }
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