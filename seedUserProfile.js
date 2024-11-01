// seedUserProfile.js

const mongoose = require('mongoose');
const UserCredentials = require('./models/UserCredentials'); // Adjust path as needed
const UserProfile = require('./models/UserProfile'); // Adjust path as needed

// MongoDB connection URL
const mongoDB = 'mongodb://localhost:27017/test'; // Replace with your database name

async function seedData() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Sample user credentials
        const userCredentials = new UserCredentials({
            email: 'testuser2@example.com',
            password: 'password123', // This will be hashed
            role: 'volunteer',
        });

        // Save user credentials
        const savedUser = await userCredentials.save();
        console.log('User credentials saved:', savedUser);

        // Sample user profile
        const userProfile = new UserProfile({
            userId: savedUser._id, // Reference to the saved user credentials
            fullName: 'Test User',
            address: '123 Test St',
            city: 'Test City',
            state: 'TS',
            zipcode: '12345',
            skills: ['JavaScript', 'Node.js'],
            preferences: 'Remote work',
            availability: 'Weekdays',
        });

        // Save user profile
        const savedProfile = await userProfile.save();
        console.log('User profile saved:', savedProfile);

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Close the MongoDB connection
        mongoose.connection.close();
    }
}

// Run the seed function
seedData();
