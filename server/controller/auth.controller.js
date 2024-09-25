const User = require("../schema/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler")



const registerUser = asyncHandler(async (req, res) => {
    const {username, password, role} = await req.body;

    const user = await User.findOne({username});
    if(user){
        console.log(user)
        return res.status(400).json({message:"This username already exists"});
    }
    else{
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                username,
                password:hashedPassword,
                role
            })
            await newUser.save();
            return res.status(201).json({message:"User registered successfully!"});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
})


const loginUser = asyncHandler(async(req,res) => {
    
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        res.status(404).json({message:"User not found."})
    }
    else{
        try {
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(isPasswordCorrect){
                const token = jwt.sign(
                    {id:user._id, role:user.role},
                    process.env.JWT_SECRET,
                    {expiresIn: "1h"}
                )
                return res.status(200).json(token)
            }
            else {
                return res.status(400).json({message:"Invalid password."})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
})

module.exports = {registerUser, loginUser}