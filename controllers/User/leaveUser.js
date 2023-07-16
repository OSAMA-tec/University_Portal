const LeaveRequest = require('../../Model/leaveModel');


const leaveUser=async (req,res)=>{
    try {
        const { startDate, endDate, reason } = req.body;

        // Validation
        if (!startDate || !endDate || !reason) {
            return res.status(400).json({ msg: 'Please include start date, end date, and reason for the leave request.' });
        }

        const newLeaveRequest = new LeaveRequest({
            user: req.user.id,
            startDate,
            endDate,
            reason,
            status: 'Pending', 
        });
        const leaveRequest = await newLeaveRequest.save();

        res.status(201).json(leaveRequest);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports={leaveUser};