const express = require('express');
const app = express();

// Import routes
const loginRoutes = require('./routes/login');
const volunteerHistoryRoutes = require('./routes/volunteerHistory');
const volunteerMatchingRoutes = require('./routes/volunteerMatching');

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use routes
app.use('/login', loginRoutes);
app.use('/volunteer-history', volunteerHistoryRoutes);
app.use('/match-volunteers', volunteerMatchingRoutes);

// Server listening on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
