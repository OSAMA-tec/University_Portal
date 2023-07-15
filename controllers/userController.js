const bcrypt=require("bcryptjs")
const jwt=require("jwt")
const User=require("../Model/userModel")


const registerUser=async (req,res)=>{
    const {regNo,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({ msg: 'User already exists' });
        }
        else{
               // Hash the password before saving it to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
            user=new User({
                regNo,email,hashedPassword
            })
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};



const loginUser= async (req,res)=>{
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ msg: 'Email does not  exists' });
        }
        else{
            const isMatch=await bcrypt.compare(password,user.password);
        
        if(!isMatch){
            return res.status(400).json({ msg: 'Wrong Password' });
        }
        else{
            const payload={
                user:{
                    id:user.id
                }
            };
            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );            
        }
    }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserProfile
};