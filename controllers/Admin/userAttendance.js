const Attendance = require("../../Model/attendanceModel")
const User = require("../../Model/userModel")

const updateAttendance = async (req, res) => {
    try {
        const user = req.params._id;
        let userAttendance = await Attendance.findOne({ user: user });
        if (!user) {
            return res.status(400).json({ msg: 'Userid not passed' });
        }
        else if (!req.body.status) {
            return res.status(400).json({ msg: 'Status not found' });
        }
        else if (!userAttendance) {
            return res.status(404).json({ msg: 'User attendance not found' });
        }
        else {
            userAttendance.status = req.body.status
            await userAttendance.save();
            return res.status(200).json({ msg: 'Updated Successfully' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const addAttendance = async (req, res) => {
    try {
        const userId = req.params._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const attendance = new Attendance({
            user: userId,
            status: req.body.status,
            date: req.body.date || new Date()
        });

        await attendance.save();

        res.status(201).json({ msg: 'Attendance record added successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const deleteAttendance = async (req, res) => {
    const userId = req.params._id;
    const attendanceId= req.params.atid;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const attendance = await Attendance.findOne({ _id: attendanceId, user: userId });
        if (!attendance) {
            return res.status(404).json({ msg: 'Attendance record not found' });
        }

        await Attendance.deleteOne({ _id: attendanceId, user: userId });

        res.status(200).json({ msg: 'Attendance record deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}





const attendanceRecord=async (req,res)=>{
    try{
        const user=req.params._id;
        if(!user){
            res.status(404).json({msg: 'Params not found' });
        }
        const records=await Attendance.find({user:user});
        res.status(201).json({ records,msg: 'Attendance record' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports = { updateAttendance, addAttendance, deleteAttendance,attendanceRecord };