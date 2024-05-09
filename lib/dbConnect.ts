import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
  } catch (error) {
    throw new Error('Connection Failed!');
  }
};

export default dbConnect;
