import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";
import cors from "cors";
import connectDatabase from "./db/dbConfig";

dotenv.config({path: "./.env"});
console.log("Environment Variables Loaded",process.env.FRONTEND_URL);
console.log("FRONTEND URL:", process.env.MONGO_URI);
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI 

console.log("url:",process.env.FRONTEND_URL);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
console.log("me");
(async () => {
  try {
    await connectDatabase();
    console.log("end");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (error) {
    console.error("Application failed to start:", error);
    process.exit(1);
  }
})();
// mongoose.connect(MONGO,mongooseOptions)
//   .then(() => {
  //     console.log("MongoDB Connected");
   
//   })
//   .catch(err => console.error(err));

