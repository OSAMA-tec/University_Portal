const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');

const {registerUser,loginUser,getUserProfile} = require('../controllers/User/userController');
const {userAttendance,getUserAttendance} = require('../controllers/User/userAttendance');
const {profilePicture} = require('../controllers/User/profilePicture')
const {leaveUser,getAllleaves} = require('../controllers/User/leaveUser')
const {auth} = require('../Middlewares/authMiddleware');

let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
  // Initialize our stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

const storage = new GridFsStorage({
  db: conn,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

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
router.put('/profile-picture', auth, upload.single('profilePicture'), profilePicture);

// Route for getting image
router.get('/image/:filename', (req, res) => {
  gfs.find({ filename: req.params.filename }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: "no files exist",
      });
    }
    gfs.openDownloadStreamByName(req.params.filename).pipe(res);
  });
});

module.exports = router;