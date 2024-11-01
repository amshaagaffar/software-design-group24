// models/UserCredentials.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userCredentialsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique emails
        lowercase: true, // Store emails in lowercase
        trim: true // Trim whitespace
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'volunteer'], // Define roles
        default: 'volunteer' // Default to 'volunteer'
    }
});

// Middleware to hash the password before saving
userCredentialsSchema.pre('save', async function(next) {
    // Only hash the password if it has been modified or is new
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10); // Hash the password
    }
    next(); // Move to the next middleware
});

// Method to compare passwords
userCredentialsSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password); // Compare provided password with stored hash
};

// Export the model
const UserCredentials = mongoose.model('UserCredentials', userCredentialsSchema);
module.exports = UserCredentials;
