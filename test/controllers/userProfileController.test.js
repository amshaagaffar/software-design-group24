jest.mock('mongoose', () => {
    const mModel = {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    };

    // Mock the schema to include Types.ObjectId and other methods
    const mSchema = jest.fn().mockImplementation(() => {
        return {
            pre: jest.fn(), // Mock the `pre` method for middleware
            methods: {
                comparePassword: jest.fn(), // Mock the `comparePassword` method
            },
            statics: {},
            Types: {
                ObjectId: jest.fn(), // Mock ObjectId
            },
        };
    });

    return {
        Schema: mSchema, // Mock the Schema constructor
        model: jest.fn().mockReturnValue(mModel), // Mock the model function to return a mocked model
        Types: {
            ObjectId: jest.fn(), // Mock ObjectId
        },
    };
});

jest.mock('../../models/UserProfile', () => {
    return {
        findOne: jest.fn(),
        findOneAndUpdate: jest.fn(),
    };
});

jest.mock('../../models/UserCredentials', () => {
    return {
        findOne: jest.fn(),
        save: jest.fn(),
    };
});

const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserProfile = require('../../models/UserProfile');
const UserCredentials = require('../../models/UserCredentials');
const userProfileController = require('../../controllers/userProfileController');

describe('UserProfile Controller', () => {
    let req;
    let res;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock request object
        req = {
            body: {},
            headers: {},
            user: { userId: 'mockUserId' }, // Mock the logged-in user with a userId
        };

        // Mock response object
        res = {
            sendFile: jest.fn(),
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
            redirect: jest.fn(),
            sendStatus: jest.fn(),
        };
    });

    describe('getUserProfile', () => {
        it('should return the user profile successfully', async () => {
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

        it('should handle errors when fetching user profile', async () => {
            const error = new Error('Database error');
            UserProfile.findOne.mockRejectedValue(error);

            await userProfileController.getUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });

    describe('createOrUpdateUserProfile', () => {
        it('should create or update user profile successfully', async () => {
            req.body = {
                fullName: 'John Doe',
                address1: '123 Street',
                address2: '',
                city: 'City',
                state: 'State',
                zipcode: '12345',
                skills: 'JavaScript,Node.js',
                preferences: 'Remote',
                availability: 'Full-time',
            };
            const mockProfileData = { ...req.body, userId: req.user.userId };
            const mockProfile = { ...mockProfileData, _id: 'mockProfileId' };

            UserProfile.findOneAndUpdate.mockResolvedValue(mockProfile);

            await userProfileController.createOrUpdateUserProfile(req, res);

            expect(UserProfile.findOneAndUpdate).toHaveBeenCalledWith(
                { userId: req.user.userId },
                mockProfileData,
                { new: true, upsert: true }
            );
            expect(res.json).toHaveBeenCalledWith({ message: 'Profile saved successfully', profile: mockProfile });
        });

        it('should handle errors when creating or updating user profile', async () => {
            req.body = {
                fullName: 'John Doe',
                address1: '123 Street',
                address2: '',
                city: 'City',
                state: 'State',
                zipcode: '12345',
                skills: 'JavaScript,Node.js',
                preferences: 'Remote',
                availability: 'Full-time',
            };
            const error = new Error('Database error');
            UserProfile.findOneAndUpdate.mockRejectedValue(error);

            await userProfileController.createOrUpdateUserProfile(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith('Server error');
        });
    });
});
