import mongoose from "mongoose";

const connectMongo = async (): Promise<typeof mongoose> => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }
  await mongoose.connect(process.env.MONGODB_URI as string);
  return mongoose;
};

export default connectMongo;
