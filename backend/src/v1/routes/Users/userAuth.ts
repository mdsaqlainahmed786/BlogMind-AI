import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import z from "zod";

import { PrismaClient } from '@prisma/client';
export const userAuth = express.Router();
const prisma = new PrismaClient();
const userSignupInput = z.object({
    firstName: z.string().min(3).max(20),
    lastName: z.string().min(3).max(20),
    username: z.string().min(3).max(20),
    email: z.string().email(),
    password: z.string().min(8)
});

const userSigninInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
const resetPasswordInput = z.object({
    password: z.string().min(8)
});


userAuth.use(cookieParser());

userAuth.post('/register', async (req: Request, res: Response) => {
    const bodyParser = userSignupInput.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: "There was an error", issues: bodyParser.error.issues });
        return
    }

    const { firstName, lastName, username, email, password } = bodyParser.data;
    try {
        const checkUser = await prisma.user.findUnique({ where: { email } });
        if (checkUser) { res.status(400).json({ message: "User already exists" }); return }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { firstName, lastName, username, email, password: hashedPassword }
        });
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '10d' });
        res.cookie("token", accessToken);
        res.json({ accessToken, message: "User created successfully" });
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error" });
        return
    }
});
userAuth.post('/login', async (req, res) => {
    const bodyParser = userSigninInput.safeParse(req.body);
    if (!bodyParser.success) {
        res.status(400).json({ error: "There was an error", issues: bodyParser.error.issues });
        return
    }
    const { email, password } = bodyParser.data;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
             res.status(400).json({ message: "User does not exist" }); 
             return 
            }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
             res.status(400).json({ message: "Invalid password" });
              return 
            }
        const sessionToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '10h' });
        res.cookie("AuthToken", sessionToken);
        res.json({ sessionToken, message: "User logged in successfully" });
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error" });
        return
    }
});