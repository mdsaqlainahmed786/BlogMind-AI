import express from 'express';
import { authenticateUser } from '../../Middleware/authMiddleWare';
import { memberShipMiddleWare } from '../../Middleware/memberShipMiddleware';

export const AiBlogsRouter = express.Router();

interface AuthenticatedRequest extends express.Request {
    user?: {
        id: string;
        username: string;
        email: string;
    }
}
//@ts-ignore
AiBlogsRouter.get('/generate', authenticateUser, memberShipMiddleWare,  async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        
    } catch (error) {
        res.status(500).json({ error: "Error generating AI Blog", details: error });
    }
});
