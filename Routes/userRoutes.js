const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile
} = require('../controllers/userController');

const auth = require('../Middlewares/authMiddleware');

// Register a new user
router.post(
    '/register',
    registerUser
);

// Login user and get token
router.post(
    '/login',
    loginUser
);

// Get user profile
router.get('/profile', auth, getUserProfile);

module.exports = router;