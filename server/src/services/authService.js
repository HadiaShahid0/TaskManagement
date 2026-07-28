import bcrypt from "bcryptjs"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"


const registerUser= async ({name, email, password})=>{
    const existingUser=await User.findOne({email});
    
    if(existingUser){
        throw new Error("User already Exists")
    }

    // generate Salt
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUND));

    // Hash Password
    const hashedPassword = await bcrypt.hash(password,salt);

    const user= await User.create({
        name,
        email,
        password: hashedPassword,
    })
    
    return{
        _id: user._id,
        name: user.name,
        email: user.email,
    };
};


const loginUser= async ({email,password})=>{
    const user= await User.findOne({email});
    
    if(!user){
        throw new Error("Invalid Email or Password")
    }

    // Check whether the entered password is same as the password that saved in db 
    const isMatch=await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error("Invalid Email or Password")
    }

    // if yes then generate Token
    const token =generateToken(user._id);

    return{
        token,
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
    };
};


export {registerUser, loginUser};