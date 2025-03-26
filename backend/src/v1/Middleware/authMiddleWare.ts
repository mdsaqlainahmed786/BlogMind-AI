import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';


// Authentication Middleware
interface AuthencatedRequest extends Request {
    user?:{
        id:string;
        isVerified:boolean;
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
            id: decoded.id,
            isVerified: decoded.isVerified
        }
        console.log(req.user);
        if(!req.user.isVerified){
            return res.status(401).json({ message: "Unauthorized: User is not verified" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};