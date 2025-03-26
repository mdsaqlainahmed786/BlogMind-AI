import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


// Authentication Middleware
interface AuthencatedRequest extends Request {
    user?:{
        username:string;
        email:string;
        isVerfied:boolean;
    }
}
export const authenticateUser = (req:AuthencatedRequest, res:Response, next:NextFunction) => {
    const token = req.cookies.AuthToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = {
            username: decoded.username,
            email: decoded.email,
            isVerfied: decoded.isVerfiied
        }
        if(!req.user.isVerfied){
            return res.status(401).json({ message: "Unauthorized: User is not verified" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};