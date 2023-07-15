const express = require('express');
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
} = require('../controllers/Admin/adminController');


// Register a new user
router.post(
    '/RA',
    registerAdmin,

);

// Login user and get token
router.post(
    '/LA',
    loginAdmin
);


module.exports = router;