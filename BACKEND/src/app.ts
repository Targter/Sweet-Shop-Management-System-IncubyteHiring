import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes"; // <--- Import the auth routes
import sweetRoutes from "./routes/sweetRoutes";

const app = express();
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   credentials: true
// }));
console.log("FRONTEND URL:", process.env.FRONTEND_URL);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(json());

app.use("/api/auth", authRoutes); // <--- Add this line
// Initialize sweet routes
app.use("/api/sweets", sweetRoutes);
// Placeholder for routes
app.get("/", (req, res) => { res.send("API Running"); });

export { app };