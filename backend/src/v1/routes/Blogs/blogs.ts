import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateUser } from '../../Middleware/authMiddleWare';
import { memberShipMiddleWare } from '../../Middleware/memberShipMiddleware';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

const prisma = new PrismaClient();
export const blogsRouter = express.Router();


interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        username: string;
        email: string;

    }
}

const likeLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5, // Limit each IP to 5 requests per windowMs
    message: "Too many requests, please try again later.",
    standardHeaders: true,
})

// Create a new blog
//@ts-ignore
blogsRouter.post('/', authenticateUser, async (req: AuthenticatedRequest, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        const { authorId, isAIGenerated, heading, description, imageUrl } = req.body;


        const newBlog = await prisma.blog.create({
            data: {
                authorId: req.user.id,
                isAIGenerated,
                heading,
                description,
                imageUrl
            },
        });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: "Error creating blog", details: error });
    }
});

// Get all blogs
//@ts-ignore
blogsRouter.get('/', async (req, res) => {
    try {
        // Parse page and limit from query params, set defaults
        const page = parseInt(req.query.page as string || '1');
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const blogs = await prisma.blog.findMany({
            skip,
            take: limit,
            include: {
                author: {
                    select: {
                        id: true,
                        avatar: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        email: true,
                    }
                },
                Comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                username: true,
                                email: true,
                            }
                        }
                    }
                },
                _count: {
                    select: { likes: true },
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const blogsWithLikeCount = blogs.map(blog => ({
            id: blog.id,
            authorId: blog.authorId,
            firstName: blog.author.firstName,
            lastName: blog.author.lastName,
            username: blog.author.username,
            email: blog.author.email,
            avatar: blog.author.avatar,
            isAIGenerated: blog.isAIGenerated,
            heading: blog.heading,
            imageUrl: blog.imageUrl,
            description: blog.description,
            Comments: blog.Comments,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            likeCount: blog._count.likes,
        }));

        res.status(200).json(blogsWithLikeCount);
    } catch (error) {
        res.status(500).json({ error: "Error fetching blogs", details: error });
    }
});


// Get a single blog by ID
//@ts-ignore
blogsRouter.get('/:id', authenticateUser, async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await prisma.blog.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        avatar: true,
                        email: true,
                        membershipPlan: true,
                    }
                },
                Comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                avatar: true,
                                firstName: true,
                                lastName: true,
                                username: true,
                                email: true,
                                membershipPlan: true,

                            }
                        }
                    }
                },
                _count: {
                    select: { likes: true },
                }
            },
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
blogsRouter.put('/edit', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
    try {

        const { id, heading, description, imageUrl } = req.body;

        const toBeUpdatedBlog = await prisma.blog.findUnique({
            where: { id },
        });
        if (toBeUpdatedBlog?.authorId !== req.user.id) {
            return res.status(401).json({ message: "You are not allowed to edit blogs, that does'nt belong to you!" });
        }
        if (!toBeUpdatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: { heading, description, imageUrl },
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
        const toBeDeletedBlog = await prisma.blog.findUnique({
            where: { id },
        });
        if (!toBeDeletedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }
        if (toBeDeletedBlog.authorId !== req.user.id) {
            return res.status(401).json({ message: "You are not allowed to delete blogs, that does'nt belong to you!" });
        }
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
blogsRouter.get('/:id/like', authenticateUser, likeLimiter,  async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }

    const { id } = req.params; // Blog ID
    const userId = req.user.id; // User ID

    try {
        // Check if the user has already liked the blog
        const existingLike = await prisma.like.findUnique({
            where: { blogId_userId: { blogId: id, userId } },
        });

        if (existingLike) {
            // Unlike the blog
            await prisma.like.delete({
                where: { blogId_userId: { blogId: id, userId } },
            });
            // Get updated like count
            const likeCount = await prisma.like.count({
                where: { blogId: id },
            });
            return res.json({ message: "Like removed", likeCount });
        } else {
            // Like the blog
            await prisma.like.create({
                data: { blogId: id, userId },
            });
            // Get updated like count
            const likeCount = await prisma.like.count({
                where: { blogId: id },
            });
            return res.json({ message: "Blog liked", likeCount, userId: userId });
        }
    } catch (error) {
        res.status(500).json({ error: "Error toggling like", details: error });
    }
});


blogsRouter.get('/:id/likes', async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params; // Blog ID

    try {
        const likes = await prisma.like.findMany({
            where: { blogId: id },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        username: true,
                        avatar: true,
                        email: true,
                        membershipPlan: true,
                    }
                }
            }
        });
        res.json(likes);
    } catch (error) {
        res.status(500).json({ error: "Error fetching likes", details: error });
    }

});
//@ts-ignore
blogsRouter.get('/user-blogs/:id', authenticateUser, async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized!" });
    }

    try {
       const { id } = req.params; // Blog ID

        const userBlogs = await prisma.blog.findMany({
            where: {
                authorId: id,
            },
            include:{
                Comments: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                username: true,
                                email: true,
                            }
                        }
                    }
                },
                _count: {
                    select: { likes: true },
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        const blogsWithLikeCount = userBlogs.map(blog => ({
            id: blog.id,
            authorId: blog.authorId,
            isAIGenerated: blog.isAIGenerated,
            heading: blog.heading,
            imageUrl: blog.imageUrl,
            description: blog.description,
            Comments: blog.Comments,
            createdAt: blog.createdAt,
            updatedAt: blog.updatedAt,
            likeCount: blog._count.likes,
        }));

        res.status(200).json(blogsWithLikeCount);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user blogs", details: error });
    }
});


