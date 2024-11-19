const VolunteerHistory = require('../models/VolunteerHistory');
const Event = require('../models/EventManagement');

exports.signUpForEvent = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventId = req.params.eventId;

        // Check if event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Check if user is already signed up
        const existingSignup = await VolunteerHistory.findOne({ userId, eventId });
        if (existingSignup) {
            return res.status(400).json({ message: 'Already signed up for this event' });
        }

        const volunteerHistory = new VolunteerHistory({
            userId,
            eventId,
            signupDate: new Date(),
            status: 'signed_up'
        });

        await volunteerHistory.save();
        res.status(201).json({
            message: 'Successfully signed up for event',
            volunteerHistory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error signing up for event',
            error: error.message
        });
    }
};

exports.getUserVolunteerHistory = async (req, res) => {
    try {
        const userId = req.user.userId;
        const volunteerHistory = await VolunteerHistory.find({ userId })
            .populate('eventId', 'eventName eventDate location') // Populate event details
            .sort({ signupDate: -1 }); // Sort by most recent first

        res.status(200).json(volunteerHistory);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching volunteer history',
            error: error.message
        });
    }
};

exports.updateVolunteerStatus = async (req, res) => {
    try {
        const { status, hoursServed, feedback } = req.body;
        const historyId = req.params.historyId;
        const userId = req.user.userId;

        const volunteerHistory = await VolunteerHistory.findOneAndUpdate(
            { _id: historyId, userId }, // Ensure the history belongs to the user
            { status, hoursServed, feedback },
            { new: true }
        );

        if (!volunteerHistory) {
            return res.status(404).json({ message: 'Volunteer history record not found' });
        }

        res.status(200).json({
            message: 'Volunteer status updated successfully',
            volunteerHistory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error updating volunteer status',
            error: error.message
        });
    }
};

exports.cancelEventSignup = async (req, res) => {
    try {
        const historyId = req.params.historyId;
        const userId = req.user.userId;

        const volunteerHistory = await VolunteerHistory.findOneAndUpdate(
            { _id: historyId, userId },
            { status: 'cancelled' },
            { new: true }
        );

        if (!volunteerHistory) {
            return res.status(404).json({ message: 'Volunteer history record not found' });
        }

        res.status(200).json({
            message: 'Event signup cancelled successfully',
            volunteerHistory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error cancelling event signup',
            error: error.message
        });
    }
};