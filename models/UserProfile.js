const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredentials', // Reference to UserCredentials model
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    address: String,
    city: String,
    state: String,
    zipcode: String,
    skills: [String],
    preferences: String,
    availability: String,
});

// Export the model
const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;