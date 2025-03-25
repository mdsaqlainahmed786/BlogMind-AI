import express from 'express';
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();

app.use(express.json());
app.get('/generate-blog', async(req, res) => {
    console.log(process.env.GEMINI_API_KEY);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = "write a blog on Different types of programming languages";
    
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});