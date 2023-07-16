const express = require('express');
const router = express.Router();

const {
    registerAdmin,
    loginAdmin,
} = require('../controllers/Admin/adminController');
const { getAllUsers } = require("../controllers/Admin/getAllUsers")
const { updateAttendance, addAttendance, deleteAttendance, attendanceRecord } = require("../controllers/Admin/userAttendance");

//authentication twt
const { authAdmin } = require('../Middlewares/authMiddleware');

// Register a new user
router.post('/RA', registerAdmin,);

// Login user and get token
router.post('/LA', loginAdmin);

//get all users data
router.get('/getUsers', authAdmin, getAllUsers)


//update the attendance of user
router.put('/updateAttendance/:_id', authAdmin, updateAttendance);
router.post('/addAttendance/:_id', authAdmin, addAttendance);
router.delete('/deleteAttendance/:_id/:atid', authAdmin, deleteAttendance);
router.get('/record/report/users/:_id', authAdmin, attendanceRecord);


module.exports = router;