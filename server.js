const express = require('express');
const app = express();
const loginRoutes = require('./routes/login'); // Import login routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Use login routes
app.use(loginRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});