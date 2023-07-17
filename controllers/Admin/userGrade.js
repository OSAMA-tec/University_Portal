const User=require("../../Model/userModel")
const Attendance = require("../../Model/attendanceModel")
const {generateReport} =require('../../Utils/records');


const GradeCalculation=async (userId,marks)=>{
    try{
        const records=await Attendance.find({user:userId});
        const report =await  generateReport(records);
        let grade;
        if(report.presentCount>=26){
            marks=marks+50;
            grade='A';
        }
        else if(report.presentCount<26&&report.presentCount>20){
            marks=marks+30;
            grade="B";
        }
        else if(report.presentCount<20&&report.presentCount>15){
            marks=marks+10;
            grade="C";
        }
        else if(report.presentCount<15&&report.presentCount>5){
            marks=marks+5;
            grade="D";
        }
        else if(report.presentCount<5){
            marks=marks;
            grade="F";
        }
        return grade;
        
        
    }catch(error){
        return error;
    }
}


const updateGrade=async (req,res)=>{
    try {
        const userId=req.params._id;
        const user=await User.findById(userId);
        if(!user){
           return  res.status(400).json({msg:"User not Found"});
        }
        const Grade= await GradeCalculation(userId,req.body.marks);
        user.grade=Grade;
        user.save();
        return  res.status(200).json({msg:"Grade Update Done"});
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

module.exports={updateGrade};