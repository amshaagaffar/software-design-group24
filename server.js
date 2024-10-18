const express = require('express');
const app = express();

// Import login routes and notification routes
const loginRoutes = require('./routes/login'); // Adjust path as necessary
const notificationRoutes = require('./routes/notificationRoutes'); // Adjust path as necessary

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use login routes
app.use(loginRoutes);

// Use notification routes
app.use(notificationRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
