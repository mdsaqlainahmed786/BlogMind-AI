import express from 'express';
import cookieParser from "cookie-parser"
require("dotenv").config();
import { userAuth } from './Users/userAuth';
import { blogsRouter } from './Blogs/blogs';
import { commentsRouter } from './Blogs/comments';
import { AiBlogsRouter } from './AIBlogs/AiBlogs';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://192.168.29.45:4173"],
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());
app.use("/api/v1/user", userAuth);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/blog/comments", commentsRouter);
app.use("/api/v1/aiblogs", AiBlogsRouter);







app.listen(5001, () => {
  console.log("The server is listening on port 5000")
})