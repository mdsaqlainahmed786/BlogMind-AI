import express from 'express';

require("dotenv").config();
import { userAuth } from './Users/userAuth';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

app.use(express.json());
app.use("/api/v1/user", userAuth);







app.listen(3000, () => {
  console.log('Server running on port 3000');
});
