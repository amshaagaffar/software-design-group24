// #file:server.js
const express = require('express');
const path = require('path');
const app = express();

// Import login and other necessary routes
const loginRoutes = require('./routes/login'); // Adjust path as necessary
const notificationRoutes = require('./routes/notificationRoutes'); // Adjust path as necessary

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

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