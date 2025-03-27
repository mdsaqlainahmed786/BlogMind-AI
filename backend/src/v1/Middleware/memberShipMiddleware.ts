import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

// Authentication Middleware
interface AuthencatedRequest extends Request {
    user?: {
        id: string;
        isVerified: boolean;
    }
}
const prisma = new PrismaClient();
export const memberShipMiddleWare = async (req: AuthencatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.AuthToken;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    try {
        const memberShipPlan = await prisma.membership.findUnique({
            where: {
                userId: req.user?.id
            },
            select: {
                plan: true,
                aiBlogsLeft: true
            }
        })
        if (!memberShipPlan) {
            return res.status(401).json({ message: "Unauthorized: No Membership Plan" });
        }
       if(memberShipPlan.aiBlogsLeft <= 0){
            return res.status(401).json({ message: "Unauthorized: No AI Blogs Left" });
       }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};