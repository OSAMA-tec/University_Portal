
const Attendance=require('../../Model/attendanceModel')


const userAttendance=async (req,res)=>{
    try{
        if(!(req.body.status)){
            return res.status(400).json({ msg: 'Status not found' });
        }
        let today=new Date();
        today.setHours(0,0,0,0);
        let existingAttendance = await Attendance.findOne({
            user: req.user.id,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) 
            }
        });
        if (existingAttendance) {
            return res.status(400).json({ msg: 'Attendance has already been marked for today' });
        }

        let attendance = new Attendance({
            user: req.user.id,
            date: new Date(),
            status:req.body.status
        });

        await attendance.save();

        res.status(201).json(attendance);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


const getUserAttendance=async (req,res)=>{
    try{
        let attendances = await Attendance.find({ user: req.user.id });

        res.status(200).json(attendances);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



module.exports={
    getUserAttendance,
    userAttendance
}