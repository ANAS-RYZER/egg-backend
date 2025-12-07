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

const PORT = process.env.PORT || 8080;

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is up and running 🚀',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/admin', userroutes);
app.use('/api/farms', farmRoutes);

const start = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }

  await connectDB(process.env.MONGO_URI);

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();
