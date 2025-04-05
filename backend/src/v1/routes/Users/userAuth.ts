import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"
import express, { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import z from "zod";
import nodemailer from 'nodemailer';
import { MembershipPlan, PrismaClient } from '@prisma/client';
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
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,  // Your Gmail address
                pass: process.env.EMAIL_PASS   // Your App password
            }
        });

        const mailOptions = {
            from: {
                name: 'CartCraze',
                address: process.env.EMAIL_USER
            },
            to: email, // List of receivers
            subject: 'Verify your email', // Subject line
            text: `Please verify your email by entering this otp`, // Plain text body
            html: `<p>Please verify your email by entering the otp: <b>${otp}</b></p>`, // HTML body
        };

        const sendMail = async (transporter: any, mailOptions: any) => {
            try {
                transporter.sendMail(mailOptions);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
        sendMail(transporter, mailOptions)
        const user = await prisma.user.create({
            data: { avatar: "", firstName, lastName, username, email, password: hashedPassword, isVerified: false, otp }
        });

        const temporaryToken = jwt.sign({ id: user.id, isVerified: false }, process.env.JWT_SECRET as string, { expiresIn: '10m' });
        res.cookie("Temptoken", temporaryToken);
        res.json({ message: "The otp is sent successfully!", otp });
        setTimeout(async () => {
            const unverifiedUser = await prisma.user.findUnique({ where: { id: user.id } });
            if (unverifiedUser && !unverifiedUser.isVerified) {
                await prisma.user.delete({ where: { id: user.id } });
                console.log(`User ${user.id} deleted due to non-verification`);
            }
        }, 600000);
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error" });
        return
    }
});
userAuth.post('/verify', async (req, res) => {
    const { otp } = req.body;
    const token = req.cookies.Temptoken;
    if (!token) {
        res.status(400).json({ message: "Token not found" });
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return
        }
        if (user.otp !== otp || !user.otp) {
            res.status(400).json({ message: "Invalid otp" });
            return
        }
        if (user.isVerified) {
            res.status(400).json({ message: "User already verified" });
            return
        }
        await prisma.user.update({ where: { id: user.id }, data: { isVerified: true } });
        await prisma.user.update({ where: { id: user.id }, data: { otp: null } });
        res.clearCookie("Temptoken");
        const accessToken = jwt.sign({ id: user.id, isVerified: true }, process.env.JWT_SECRET as string, { expiresIn: '10h' });
        res.cookie("AuthToken", accessToken);
        const userMembership = await prisma.membership.findUnique({
            where: { userId: user.id }
        });
        console.log("User Membership", userMembership);
        if (!userMembership) {
            await prisma.membership.create({
                data: {
                    userId: user.id,
                    aiBlogsLeft: 0,
                    plan: "BASIC"
                }
            });
        }
        res.json({ message: "User verified successfully" });
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "The OTP might have expired! Please register again" });
        return
    }
})
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
        if (!user.isVerified) {
            res.status(400).json({ message: "User is not verified" });
            return
        }
        const sessionToken = jwt.sign({ id: user.id, isVerified: user.isVerified }, process.env.JWT_SECRET as string, { expiresIn: '10h' });
        res.cookie("AuthToken", sessionToken, {
            secure: true,
            sameSite: 'none',
        });
        res.json({ sessionToken, message: "User logged in successfully" });
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error" });
        return
    }
});
userAuth.get('/logout', async (req, res) => {
    res.clearCookie("AuthToken");
    res.json({ message: "User logged out successfully" });
    return
});
userAuth.get("/get-user", async (req, res) => {
    const token = req.cookies.AuthToken;
    if (!token) {
        res.status(400).json({ message: "Token not found" });
        return
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return
        }
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            avatar: user.avatar,
            isVerified: user.isVerified,
            MembershipPlan: user.membershipPlan,
            email: user.email
        });
        return
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "There was an error" });
        return
    }
});