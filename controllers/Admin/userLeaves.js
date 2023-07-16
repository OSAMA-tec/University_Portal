
const Leave = require("../../Model/leaveModel")


const allLeaves = async (req, res) => {
    try {
        const leaveRecord = await Leave.find();
        if (!leaveRecord) {
            return res.status(400).json({ msg:"No leave found" });
        }
        return res.status(200).json({ leaveRecord });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



const updateRequest=async(req,res)=>{
    try {
       const requestId=req.params.reqid;
       const status=req.body.status;
       if(!status){
        return res.status(400).json({ msg:"Status is empty" });
    }
    const userrequest=await Leave.findById(requestId);
    if(!userrequest){ 
        return res.status(400).json({ msg:"No request form" });
    }
    userrequest.status=status;
    userrequest.save();
    return res.status(200).json({ msg:"Status Updated" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports={allLeaves,updateRequest};