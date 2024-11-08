// models/UserProfile.js
const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredentials',
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
        maxlength: 50
    },
    address1: {
        type: String,
        required: true,
        maxlength: 100
    },
    address2: {
        type: String,
        maxlength: 100
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true,
        match: /^[0-9]{5}([0-9]{4})?$/
    },
    skills: {
        type: [String],
        required: true
    },
    preferences: {
        type: String,
        maxlength: 500
    },
    availability: {
        type: Date,
        required: true
    }
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;
