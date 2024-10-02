// config/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error("DB CONNECTION FAILED", err);
  }
};

export default connectDB;
