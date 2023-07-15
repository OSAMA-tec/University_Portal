const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const Admin=require("../Model/adminModel")



const registerAdmin=async (req,res)=>{
    const {email,password,name}=req.body;
    try{

        if(!email.includes("@admin.com")){
            return res.status(400).json({ msg: 'WRONG EMAIL' });
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            let admin=new Admin({
                email, password: hashedPassword,name
            })
            await admin.save();
            return res.status(200).json({ msg: 'Registered!' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}
const loginAdmin=async (req,res)=>{
    const {email,password}=req.body;
    try{

        if(!email.includes("@admin.com")){
            return res.status(400).json({ msg: 'WRONG EMAIL' });
        }
        else{
            let admin=await Admin.findOne({email});
            const isMatch=await bcrypt.compare(password,admin.password);
           if(isMatch){
               return res.status(200).json({ msg: 'Signin Successfull!' });
            }
            else{
                return res.status(400).json({ msg: 'Wrong Password!' });
           }
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

}



module.exports = {
    registerAdmin,
    loginAdmin
};