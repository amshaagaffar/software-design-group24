// #file: controllers/eventController.js
const Event = require('../models/EventManagement');
const UserProfile = require('../models/UserProfile');
// Create a new event
exports.createEvent = async (req, res) => {
    try {
        const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

        const newEvent = new Event({
            eventName,
            eventDescription,
            location,
            requiredSkills,
            urgency,
            eventDate
        });

        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: newEvent });
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error: error.message });
    }
};

// Get all events
exports.getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching events', error: error.message });
    }
};

// Get event by ID
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching event', error: error.message });
    }
};

// Update event by ID
exports.updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        res.status(400).json({ message: 'Error updating event', error: error.message });
    }
};

// Delete event by ID
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting event', error: error.message });
    }
};



exports.getFilteredEventsBySkills = async (req, res) => {
    try {
        // Ensure user is authenticated and retrieve their ID from the request
        if (!req.user || !req.user._id) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        const userId = req.user._id;  // Assuming user ID is available in req.user after JWT authentication

        // Fetch user's profile
        const userProfile = await UserProfile.findOne({ userId });
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found' });
        }

        // Get user's skills
        const userSkills = userProfile.skills;

        // Find events where requiredSkills overlap with user's skills
        const events = await Event.find({
            requiredSkills: { $in: userSkills }  // Match events that require any of the user's skills
        });

        res.status(200).json(events);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Error fetching filtered events', error: error.message });
    }
};