import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
export async function connectDB() {
  const MONGO_URI =
    process.env.NODE_ENV === 'development'
      ? (process.env.LOCAL_MONGO_URI as string)
      : (process.env.REMOTE_MONGO_URI as string);
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`mongodb connected : ${connection.connection.host}`);
  } catch (error: any) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
}
