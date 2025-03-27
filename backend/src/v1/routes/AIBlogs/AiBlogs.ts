import express from 'express';
import { authenticateUser } from '../../Middleware/authMiddleWare';
import { memberShipMiddleWare } from '../../Middleware/memberShipMiddleware';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();
export const AiBlogsRouter = express.Router();

interface AuthenticatedRequest extends express.Request {
    user?: {
        id: string;
        username: string;
        email: string;
    }
}
//@ts-ignore
AiBlogsRouter.post('/generate', authenticateUser, memberShipMiddleWare, async (req: AuthenticatedRequest, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

        const userId = req.user.id;
        const { heading } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        // Generate and wait for complete response
        const result = await model.generateContent(`Write a comprehensive blog about ${heading}`);
        const response = await result.response;
        const description = await response.text(); // Convert response to string

        // Create blog with valid string data
        const newBlog = await prisma.blog.create({
            data: {
                authorId: userId,
                isAIGenerated: true,
                heading,
                description // Now a string
            }
        });

        // Update membership
        await prisma.membership.update({
            where: { userId },
            data: { aiBlogsLeft: { decrement: 1 } }
        });

        return res.status(201).json({ message: "AI blog generated successfully", blog: newBlog });
    } catch (error) {
        console.error("Generation error:", error);
        return res.status(500).json({ message: "Blog generation failed", error: error });
    }
});


//@ts-ignore
AiBlogsRouter.post('/upgrade', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const userId = req.user.id;
        const { plan } = req.body;

        const userMembership = await prisma.membership.findUnique({
            where: { userId }
        });

        if (plan === "STANDARD") {
            await prisma.membership.update({
                where: { userId },
                data: { aiBlogsLeft: { increment: 10 } }
            })
        }
        else if (plan === "PREMIUM") {
            await prisma.membership.update({
                where: { userId },
                data: { aiBlogsLeft: { increment: 25 } }
            })
        }

        if (userMembership) {
            await prisma.membership.update({
                where: { userId },
                data: { plan }
            });
        } else {
            await prisma.membership.create({
                data: {
                    userId,
                    plan
                }
            });
        }

        return res.status(201).json({ message: `Membership upgraded successfully to ${plan}` });
    } catch (error) {
        res.status(500).json({ error: "Error upgrading membership", details: error });
    }
})
//@ts-ignore
AiBlogsRouter.get('/membership', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const userId = req.user.id;
        const userMembership = await prisma.membership.findUnique({
            where: { userId },

        });
        if (!userMembership) return res.status(200).json({ message: "No Membership Plan" })
        return res.status(200).json({ membership: userMembership });
    } catch (error) {
        res.status(500).json({ error: "Error getting membership", details: error });
    }
})


