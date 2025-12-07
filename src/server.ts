import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userroutes from "./routes/user.routes";
import farmRoutes from './routes/farm.routes';

dotenv.config();

const app = express();

// FIXED CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// HEALTH CHECK
app.get('/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Love U whyshuuu"
  });
});

// Routes
app.use('/api/admin', userroutes);
app.use('/api/farms', farmRoutes);

// DB connect
if (process.env.MONGO_URI) {
  connectDB(process.env.MONGO_URI);
}

// No app.listen() --> required for Vercel
export default app;
