const User=require("../../Model/userModel")




const getAllUsers=async (req,res)=>{
    try{
        const users = await User.find().select('-password');
        if(!users){
            return res.status(400).json({ msg: 'Data does not  exists' });
        }
        else{
            return res.status(200).json({users});
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports={getAllUsers}