const mongoose = require('mongoose');

const volunteerHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCredentials',
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    signupDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['signed_up', 'completed', 'cancelled'],
        default: 'signed_up'
    },
    feedback: {
        type: String
    },
    hoursServed: {
        type: Number
    }
});

const VolunteerHistory = mongoose.model('VolunteerHistory', volunteerHistorySchema);
module.exports = VolunteerHistory;