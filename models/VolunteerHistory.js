const volunteerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    skills: {
        type: String,
        required: false // Optional
    },
    availability: {
        type: Date,
        required: false // Optional
    }
});

module.exports = mongoose.model('Volunteer', volunteerSchema);

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    requirements: {
        type: String,
        required: false // Optional
    },
    date: {
        type: Date,
        required: false // Optional
    }
});

module.exports = mongoose.model('Event', eventSchema);

const volunteerHistorySchema = new mongoose.Schema({
    volunteerName: {
        type: String,
        required: true,
        trim: true
    },
    matchedEvent: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now // Auto set to the current date
    }
});

module.exports = mongoose.model('VolunteerHistory', volunteerHistorySchema);
