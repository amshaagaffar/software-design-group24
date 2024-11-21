const VolunteerHistory = require('../models/VolunteerHistory');
const Event = require('../models/EventManagement');

exports.sendEventReminder = async (req, res) => {
    try {
        const userId = req.user.userId; // Extract the user ID from the authenticated request

        // Fetch upcoming events the user is signed up for
        const today = new Date();
        const reminders = await VolunteerHistory.find({
            userId,
            status: 'signed_up' // Only fetch events where the user is signed up
        })
            .populate({
                path: 'eventId',
                match: { eventDate: { $gte: today } }, // Only events happening in the future
                select: 'eventName eventDate location' // Only include these fields
            });

        // Filter out entries where the populated eventId is null (past events or invalid data)
        const upcomingEvents = reminders.filter(entry => entry.eventId);

        // Format the response
        const reminderDetails = upcomingEvents.map(entry => ({
            eventName: entry.eventId.eventName,
            eventDate: entry.eventId.eventDate,
            location: entry.eventId.location
        }));

        res.status(200).json({
            message: 'Upcoming event reminders fetched successfully',
            reminders: reminderDetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error fetching event reminders',
            error: error.message
        });
    }
};