import express from 'express';
import { authenticateUser } from '../../Middleware/authMiddleWare';
import { memberShipMiddleWare } from '../../Middleware/memberShipMiddleware';
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import dotenv from 'dotenv';
import razorpay, { PLAN_DETAILS, PLAN_PRICES } from '../../razorpayConfig';
import axios from 'axios';
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
interface UnsplashResponse {
    results: { urls: { regular: string } }[];
}
//@ts-ignore
AiBlogsRouter.post('/generate', authenticateUser, memberShipMiddleWare, async (req: AuthenticatedRequest, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "Unauthorized!" });

        const userId = req.user.id;
        const { heading } = req.body;

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const result = await model.generateContent(`Please write a blog post about ${heading} and use facts and data throughout the article while citing your sources as well as write the introduction in a storytelling format. Use proper spaces, gaps and proper markdown format. Also write a conclusion and a call to action at the end of the blog post. Make sure to write in a friendly tone and use simple language. Make sure you start with the given topic, not any sentence before that`);
        const response = await result.response;
        const description = await response.text();
        const unsplashImg = await axios.get<UnsplashResponse>(`https://api.unsplash.com/search/photos?client_id=${process.env.UNSPALSH_CLEINTID}&query=${heading}`);
        const imageUrl = unsplashImg.data.results[0].urls.regular;
        const newBlog = await prisma.blog.create({
            data: {
                authorId: userId,
                isAIGenerated: true,
                heading,
                description,
                imageUrl
            }
        });


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
                data: {
                    aiBlogsLeft: { increment: 10 },
                    plan: "STANDARD"
                }
            })
            await prisma.user.update({
                where: { id: userId },
                data: {
                    membershipPlan: "STANDARD"
                }
            });
        }
        else if (plan === "PREMIUM") {
            await prisma.membership.update({
                where: { userId },
                data: {
                    aiBlogsLeft: { increment: 25 },
                    plan: "PREMIUM"
                }
            })
            await prisma.user.update({
                where: { id: userId },
                data: {
                    membershipPlan: "PREMIUM"
                }
            });
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

//@ts-ignore
// AiBlogsRouter.post('/create-checkout-session', authenticateUser, async (req:AuthenticatedRequest, res) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized!" });
//     }
//     const userId = req.user.id;
//     const { plan } = req.body as { plan: 'STANDARD' | 'PREMIUM' };
//     const prices: { [key in 'STANDARD' | 'PREMIUM']: string } = {
//       STANDARD: '4.99', // Replace with actual Stripe price ID
//       PREMIUM: '11.99',
//     };
  
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price: prices[plan],
//         quantity: 1,
//       }],
//       mode: 'payment',
//       success_url: `http://localhost:5173/payment-success?plan=${plan}&userId=${userId}`,
//       cancel_url: `http://localhost:5173/payment-cancel`,
//       metadata: {
//         userId,
//         plan,
//       }
//     });
  
//     res.json({ url: session.url });
//   });
// Create a new order for membership upgrade
AiBlogsRouter.post('/create-membership-order', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    
    try {
      const { plan } = req.body;
      const userId = req.user.id;
      
      // Validate plan selection
      if (!['STANDARD', 'PREMIUM'].includes(plan)) {
        return res.status(400).json({ message: "Invalid plan selected" });
      }
      
      // Get current user info for receipt
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Create a shorter receipt string (max 40 chars)
      // Use a timestamp in seconds rather than milliseconds to save characters
      const timestamp = Math.floor(Date.now() / 1000);
      const receipt = `mem_${timestamp}_${userId.substring(0, 8)}`;
      
      // Create order in Razorpay
      const options = {
        amount: PLAN_PRICES[plan as keyof typeof PLAN_PRICES],
        currency: "INR",
        receipt: receipt, // Now this will be less than 40 characters
        notes: {
          userId: userId,
          plan: plan,
          username: user.username,
          email: user.email
        }
      };
      
      const order = await razorpay.orders.create(options);
      
      return res.status(200).json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({ message: "Error creating payment order", error });
    }
  });
  
  // Route to verify and process payment
    //@ts-ignore
  AiBlogsRouter.post('/verify-payment', authenticateUser, async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;
      const userId = req.user.id;
      
      // Verify payment signature
      const generatedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET as string)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');
      
      // Check if generated signature matches the one from Razorpay
      if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Payment verification failed" });
      }
      
      // Get payment details from Razorpay to double-check
      const payment = await razorpay.payments.fetch(razorpay_payment_id);
      
      if (payment.status !== 'captured') {
        return res.status(400).json({ message: "Payment not completed" });
      }
      
      // Update membership in database
      // First check if user already has a membership
      const userMembership = await prisma.membership.findUnique({
        where: { userId }
      });
      
      if (plan === "STANDARD" || plan === "PREMIUM") {
        const aiBlogs = plan === "STANDARD" ? 10 : 25;
        
        if (userMembership) {
          // Update existing membership
          await prisma.membership.update({
            where: { userId },
            data: {
              plan: plan,
              aiBlogsLeft: { increment: aiBlogs }
            }
          });
        } else {
          // Create new membership
          await prisma.membership.create({
            data: {
              userId,
              plan: plan,
              aiBlogsLeft: aiBlogs
            }
          });
        }
        
        // Update user model
        await prisma.user.update({
          where: { id: userId },
          data: {
            isSubscribed: true,
            membershipPlan: plan
          }
        });
      }
      
      return res.status(200).json({ 
        message: `Membership successfully upgraded to ${plan}`,
        paymentId: razorpay_payment_id
      });
    } catch (error) {
      console.error("Payment verification error:", error);
      return res.status(500).json({ message: "Error processing payment", details: error });
    }
  });


