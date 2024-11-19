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


exports.signUpForEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const userId = req.user.userId; // Get user ID from the JWT token

        // Find the event
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is already signed up for the event
        if (event.volunteers.includes(userId)) {
            return res.status(400).json({ message: 'You are already signed up for this event' });
        }

        // Add user to event's volunteer list
        event.volunteers.push(userId);
        await event.save();

        res.status(200).json({ message: 'Successfully signed up for the event' });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up for event', error: error.message });
    }
};


