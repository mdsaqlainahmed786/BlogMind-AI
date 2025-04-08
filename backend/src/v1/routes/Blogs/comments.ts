import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '../../Middleware/authMiddleWare';
import rateLimit from 'express-rate-limit';
const prisma = new PrismaClient();
export const commentsRouter = express.Router();
interface AuthenticatedRequest extends express.Request {
    user?: {
        id: string;
        username: string;
        email: string;
    }
}

const commentRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many comments created from this IP, please try again later."
});


//@ts-ignore
// Create Comment
commentsRouter.post('/', authenticateUser, commentRateLimiter, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized!" });
        return
    }
    try {
        const { blogId, comment } = req.body;

        if (!blogId || !comment) {
            return res.status(400).json({ error: "blogId and comment are required" });
        }

        const newComment = await prisma.comments.create({
            data: {
                comment,
                user: { connect: { id: req.user.id } },
                blog: { connect: { id: blogId } }
            }
        });

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: "Error creating comment", details: error });
    }
});

// Get All Comments for a Blog
//@ts-ignore
commentsRouter.get('/:blogId', authenticateUser, async (req: AuthenticatedRequest, res) => {
    try {
        const comments = await prisma.comments.findMany({
            where: { blogId: req.params.blogId },
            include: {
                user: { select: { id: true, username: true, firstName: true, lastName: true, avatar: true } } // Only return necessary user info
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Error fetching comments", details: error });
    }
});

// Update Comment
//@ts-ignore
commentsRouter.put('/:id', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

    try {
        const updatedComment = await prisma.comments.update({
            where: { id: req.params.id },
            data: { comment: req.body.comment },
            include: { user: { select: { id: true, username: true, email: true } } }
        });

        // Check ownership
        if (updatedComment.userId !== req.user.id) {
            return res.status(403).json({ message: "You can only edit your own comments" });
        }

        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: "Error updating comment", details: error });
    }
});

// Delete Comment
//@ts-ignore
commentsRouter.delete('/:id', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

    try {
        const comment = await prisma.comments.findUnique({
            where: { id: req.params.id }
        });

        if (!comment) return res.status(404).json({ error: "Comment not found" });
        if (comment.userId !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own comments" });
        }

        await prisma.comments.delete({ where: { id: req.params.id } });
        res.status(200).json({
            message: "Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ error: "Error deleting comment", details: error });
    }
});

