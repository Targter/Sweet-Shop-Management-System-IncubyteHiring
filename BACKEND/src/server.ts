import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config({path: "./.env"});
console.log("Environment Variables Loaded",process.env.FRONTEND_URL);
console.log("FRONTEND URL:", process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "mongodb://localhost:27017/sweetsdb";

  //  console.log("dbUri:", process.env.DB_URI);
  const connectDatabase = async () => {
  try {
    console.log("dbUri:", MONGO);
    const connectionInstance = await mongoose.connect(MONGO); 

    console.log(
      `✅ MongoDB connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDatabase();