const express = require('express');
const router = express.Router();

const { registerAdmin, loginAdmin, } = require('../controllers/Admin/adminController');
const { getAllUsers } = require("../controllers/Admin/getAllUsers")
const { updateAttendance, addAttendance, deleteAttendance, attendanceRecord,AllRecord } = require("../controllers/Admin/userAttendance");
const {updateGrade}=require('../controllers/Admin/userGrade')
const {allLeaves,updateRequest}=require("../controllers/Admin/userLeaves")
//authentication twt
const { authAdmin } = require('../Middlewares/authMiddleware');




//Login and Signup
router.post('/RA', registerAdmin,);
router.post('/LA', loginAdmin);
//all users
router.get('/getUsers', authAdmin, getAllUsers)
// attendance of user
router.put('/updateAttendance/:_id', authAdmin, updateAttendance);
router.post('/addAttendance/:_id', authAdmin, addAttendance);
router.delete('/deleteAttendance/:_id/:atid', authAdmin, deleteAttendance);
router.get('/record/report/users/:_id', authAdmin, attendanceRecord);
router.get('/record/report/allusers', authAdmin, AllRecord);
//leaves of user
router.get('/leaves/users',authAdmin,allLeaves);
router.put('/leaves/users/:reqid',authAdmin,updateRequest);

//grades
router.put('/grade/users/:_id',authAdmin,updateGrade);


module.exports = router;