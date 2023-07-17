const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dir = './uploads';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}
const {registerUser,loginUser,getUserProfile} = require('../controllers/User/userController');
const { userAttendance,getUserAttendance} = require('../controllers/User/userAttendance');
const {profilePicture}=require('../controllers/User/profilePicture')
const {leaveUser,getAllleaves}=require('../controllers/User/leaveUser')


const {auth} = require('../Middlewares/authMiddleware');

// Register a new user
router.post('/register',registerUser);
// Login user and get token
router.post('/login',loginUser);
//attendance
router.post('/attendance',auth,userAttendance);
//get all attendance
router.get( '/attendance',auth,getUserAttendance);
// Get user profile
router.get('/profile', auth, getUserProfile);
//leave user
router.post('/leave-user',auth,leaveUser);
router.get('/leaves',auth,getAllleaves);


//profile picture
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.put('/profile-picture', auth, upload.single('profilePicture'),profilePicture);



module.exports = router;