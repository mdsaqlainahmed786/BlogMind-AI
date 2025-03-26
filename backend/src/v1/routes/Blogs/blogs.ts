import express from 'express';
export const blogsRouter = express.Router();

blogsRouter.get('/', (req, res) => {
    res.send('Hello from blogs');
});

