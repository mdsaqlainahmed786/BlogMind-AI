import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '../../Middleware/authMiddleWare';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();
export const blogsRouter = express.Router();


interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;

    }
}

// Create a new blog
//@ts-ignore
blogsRouter.post('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        const { authorId, isAIGenerated, heading, description } = req.body;

        const newBlog = await prisma.blog.create({
            data: {
                authorId: req.user.id,
                isAIGenerated,
                heading,
                description,
            },
        });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: "Error creating blog", details: error });
    }
});

// Get all blogs
//@ts-ignore
blogsRouter.get('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const blogs = await prisma.blog.findMany({
            include: { author: true },
        });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: "Error fetching blogs", details: error });
    }
});

// Get a single blog by ID
//@ts-ignore
blogsRouter.get('/:id', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const { id } = req.params;
        const blog = await prisma.blog.findUnique({
            where: { id },
            include: { author: true },
        });
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: "Error fetching blog", details: error });
    }
});

// Update a blog by ID
//@ts-ignore
blogsRouter.put('/:id', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const { id } = req.params;
        const { heading, description } = req.body;

        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: { heading, description },
        });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: "Error updating blog", details: error });
    }
});

// Delete a blog by ID
//@ts-ignore
blogsRouter.delete('/:id', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized!" });
        return
    }
    try {
        const { id } = req.params;
        await prisma.blog.delete({
            where: { id },
        });
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting blog", details: error });
    }
});

// like handler
//@ts-ignore
blogsRouter.post('/:id/like', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {
        const { id } = req.params;
        const blog = await prisma.blog.findUnique({
            where: { id },
        });
        if (!blog) {
            res.status(404).json({ error: "Blog not found" });
            return
        }
        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: { likes: blog.likes + 1 },
        });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: "Error liking blog", details: error });
    }
});
