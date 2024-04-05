import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'

// authenticate user = check creds and tokens
const authenticate = asyncHandler(async (req, res, next)=>{
    let token;
    // read jwt from jwt cookie
    token = req.cookies.jwt;

    if(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();

        } catch(error){
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }
    } else{
        // res.status(401)
        throw new Error("Not authorized, no such token found.")
    }
});

// check for admin
const authorizeAdmin = (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not auhorized as an admin");
    }
}

export {authenticate, authorizeAdmin} 