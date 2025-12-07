import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db';
import userroutes from "./routes/user.routes";
import farmRoutes from './routes/farm.routes';
import recordRoutes from './routes/record.routes';
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(cors());
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
app.use('/api/records', recordRoutes);

// DB connect
if (process.env.MONGO_URI) {
  connectDB(process.env.MONGO_URI);
}
 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
// ❗ IMPORTANT: No app.listen()
export default app;
