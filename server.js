const express = require('express');
const mongoose = require('mongoose');
// const morgan = require('morgan');//
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Connect to MongoDB without deprecated options
mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err);
});

db.on('open', () => {
    console.log('Database Connected');
});

// Import login and other necessary routes
const loginRoutes = require('./routes/login'); // Adjust path as necessary
const notificationRoutes = require('./routes/notificationRoutes'); // Adjust path as necessary

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Use login routes
app.use(loginRoutes);

// Use notification routes
app.use(notificationRoutes);

// Serve volunteerhistory.html
app.get('/volunteerhistory.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'volunteerhistory.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
