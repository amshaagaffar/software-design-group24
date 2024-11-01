const UserProfile = require('../models/UserProfile');
const UserCredentials = require('../models/UserCredentials'); // Import UserCredentials

// Create or update user profile
exports.createOrUpdateUserProfile = async (req, res) => {
    const { fullName, address, city, state, zipcode, skills, preferences, availability } = req.body;

    try {
        // Find the user by email
        const user = await UserCredentials.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Upsert the user profile
        const profileData = {
            userId: user._id,
            fullName,
            address,
            city,
            state,
            zipcode,
            skills,
            preferences,
            availability,
        };

        const userProfile = await UserProfile.findOneAndUpdate(
            { userId: user._id },
            profileData,
            { new: true, upsert: true } // Create if not exists
        );

        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// Get user profile by user ID
exports.getUserProfile = async (req, res) => {
    try {
        const userProfile = await UserProfile.findOne({ userId: req.user.userId });
        if (!userProfile) {
            return res.status(404).send('User profile not found');
        }
        res.json(userProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};