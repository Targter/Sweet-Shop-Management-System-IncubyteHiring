import mongoose from "mongoose";
import dotenv from "dotenv";
import { app } from "./app";

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGO_URI || "";

mongoose.connect(MONGO)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch(err => console.error(err));