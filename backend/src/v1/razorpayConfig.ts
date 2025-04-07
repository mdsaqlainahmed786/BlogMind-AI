import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Razorpay with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

// Define pricing for different membership plans
export const PLAN_PRICES = {
  STANDARD: 29900, // ₹299 (in paise)
  PREMIUM: 59900   // ₹599 (in paise)
};

// Define plan details including features
export const PLAN_DETAILS = {
  STANDARD: {
    name: 'Standard Membership',
    description: 'Access to 10 AI-generated blogs',
    aiBlogs: 10,
    price: PLAN_PRICES.STANDARD,
    interval: 'monthly'
  },
  PREMIUM: {
    name: 'Premium Membership',
    description: 'Access to 25 AI-generated blogs',
    aiBlogs: 25,
    price: PLAN_PRICES.PREMIUM,
    interval: 'monthly'
  }
};

export default razorpay;