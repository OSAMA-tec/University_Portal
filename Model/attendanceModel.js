const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
        default: 'Absent',
    },
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);

module.exports = Attendance;