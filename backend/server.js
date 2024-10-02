// server.js
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import corsMiddleware from "./middlewares/cors.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(corsMiddleware);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json("Server running successfully.");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
