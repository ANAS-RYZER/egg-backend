import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userroutes from "./routes/user.routes";
import farmRoutes from './routes/farm.routes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server running on Vercel 🚀"
  });
});

// Routes
app.use('/api/admin', userroutes);
app.use('/api/farms', farmRoutes);

// DB connect
if (process.env.MONGO_URI) {
  connectDB(process.env.MONGO_URI);
}

// ❗ IMPORTANT: No app.listen()
export default app;
