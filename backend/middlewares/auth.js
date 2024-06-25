import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";

export const isAuthenticated = catchAsyncError(async(req,res,next)=>{
     const {token} = req.cookies
    //  console.log(token);
    if(!token){
        return next(new ErrorHandler("Please log in to continue",401))
    }
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(decodedToken._id)
    next()
})

export const authorizeAdmin = (req,res,next) =>{
    if(req.user.role !== "admin"){
        return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`,403))
    }
    next()
}

export const authorizeSubscribers = (req,res,next) =>{
    if(req.user.role !== "admin" && req.user.subscription.status !== "active"){
        return next(new ErrorHandler(`Only subscribers are allowed to access this resource`,403))
    }
    next()
}