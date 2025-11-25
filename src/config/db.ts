import mongoose from 'mongoose';

export const connectDB = async (uri: string): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log('Sita rama raju polutry farm connected');
  } catch (err) {
    console.error('DB connection error', err);
    process.exit(1);
  }
};
