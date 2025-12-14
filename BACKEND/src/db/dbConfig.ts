// const mongoose = require("mongoose");
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    console.log("dbUri:", process.env.MONGO_URI);
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    const connectionInstance = await mongoose.connect(uri);

    console.log(
      `✅ MongoDB connected! Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

// module.exports = connectDatabase;
export default connectDatabase;