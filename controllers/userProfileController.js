const UserProfile = require('../models/UserProfile');
const UserCredentials = require('../models/UserCredentials');

// Get the user profile based on logged-in user's ID
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const profile = await UserProfile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.json(profile);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Create or update the user profile
exports.createOrUpdateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;

        const profileData = {
            userId,
            fullName: req.body.fullName,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            skills: req.body.skills.split(','), // Convert skills from comma-separated string to array
            preferences: req.body.preferences,
            availability: req.body.availability
        };

        const profile = await UserProfile.findOneAndUpdate(
            { userId },
            profileData,
            { new: true, upsert: true } // Create if not found, otherwise update
        );

        res.json({ message: 'Profile saved successfully', profile });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
