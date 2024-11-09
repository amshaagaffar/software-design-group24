const mongoose = require('mongoose');

// Define the schema for event management
const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true, maxlength: 100 },
    eventDescription: { type: String, required: true },
    location: { type: String, required: true },
    requiredSkills: { type: [String], required: true },
    urgency: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    eventDate: { type: Date, required: true }
});

// Create the model for Event Management
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
