import jwt from "jsonwebtoken";
import User from "../../models/userModel.js"

const protect = async (req, res, next)=>{
    try{
        const token=req.cookies.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message: "Not authorized. Please Login"
            })
        }
        
        // Verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user =await User.findById(decoded.id);

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }

        req.user=user;
        
        next()

    }catch(error){

        res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
        
    }
}
export default protect;