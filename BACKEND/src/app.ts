import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRoutes from "./routes/authRoutes"; // <--- Import the auth routes


const app = express();
app.use(cors());
app.use(json());

app.use("/api/auth", authRoutes); // <--- Add this line
// Placeholder for routes
app.get("/", (req, res) => { res.send("API Running"); });

export { app };