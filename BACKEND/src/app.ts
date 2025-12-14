import express from "express";
// import cors from "cors";
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes"; // <--- Import the auth routes
import sweetRoutes from "./routes/sweetRoutes";
// import connectDatabase from "./server";
const app = express();

app.use(json());

app.use("/api/auth", authRoutes); // <--- Add this line
// Initialize sweet routes
app.use("/api/sweets", sweetRoutes);
// Placeholder for routes
app.get("/", (req, res) => { res.send("API Running"); });

export { app };