jest.mock('../models/UserProfile', () => {
    return {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    };
});

jest.mock('../models/UserCredentials', () => {
    return {
        findOne: jest.fn(),
    };
});

const request = require('supertest');
const express = require('express');
const userProfileController = require('../../controllers/userProfileController');
const UserProfile = require('../../models/UserProfile');
const UserCredentials = require('../../models/UserCredentials');

describe('UserProfile Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock request object
        req = {
            user: { userId: 'mockUserId' }, // Mock userId (assuming it comes from a JWT middleware)
            body: {},
        };

        // Mock response object
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    describe('getUserProfile', () => {
        it('should return user profile successfully', async () => {
            const mockProfile = { userId: 'mockUserId', fullName: 'John Doe' };
            UserProfile.findOne.mockResolvedValue(mockProfile);

            await userProfileController.getUserProfile(req, res);

            expect(UserProfile.findOne).toHaveBeenCalledWith({ userId: 'mockUserId' });
            expect(res.json).toHaveBeenCalledWith(mockProfile);
        });

        it('should handle profile not found', async () => {
            UserProfile.findOne.mockResolvedValue(null);

            await userProfileController.getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ message: 'Profile not found' });
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            UserProfile.findOne.mockRejectedValue(error);

            await userProfileController.getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });

    describe('createOrUpdateUserProfile', () => {
        const mockProfileData = {
            fullName: 'John Doe',
            address1: '123 Main St',
            address2: 'Apt 4B',
            city: 'New York',
            state: 'NY',
            zipcode: '10001',
            skills: 'JavaScript,Node.js',
            preferences: 'Remote',
            availability: 'Full-time',
        };

        it('should create or update user profile successfully', async () => {
            req.body = mockProfileData;
            const mockUpdatedProfile = { ...mockProfileData, userId: 'mockUserId' };
            UserProfile.findOneAndUpdate.mockResolvedValue(mockUpdatedProfile);

            await userProfileController.createOrUpdateUserProfile(req, res);

            expect(UserProfile.findOneAndUpdate).toHaveBeenCalledWith(
                { userId: 'mockUserId' },
                { ...mockProfileData, userId: 'mockUserId' },
                { new: true, upsert: true }
            );
            expect(res.json).toHaveBeenCalledWith({
                message: 'Profile saved successfully',
                profile: mockUpdatedProfile,
            });
        });

        it('should handle errors', async () => {
            req.body = mockProfileData;
            const error = new Error('Save error');
            UserProfile.findOneAndUpdate.mockRejectedValue(error);

            await userProfileController.createOrUpdateUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });
});
