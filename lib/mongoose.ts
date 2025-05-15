import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) return;

  await mongoose.connect(MONGODB_URI);
  isConnected = true;
};

export default connectToDatabase;
