import express from 'express';
import cookieParser from "cookie-parser"
require("dotenv").config();
import { userAuth } from './Users/userAuth';
import { blogsRouter } from './Blogs/blogs';
import { commentsRouter } from './Blogs/comments';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(cookieParser());

app.use(express.json());
app.use("/api/v1/user", userAuth);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/blog/comments", commentsRouter);







app.listen(3000, () => {
  console.log('Server running on port 3000');
});
