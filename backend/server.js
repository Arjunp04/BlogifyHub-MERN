import express from "express"; // Updated import statement
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import { join } from "path"; // Updated import statement
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js";
import commentRoute from "./routes/comments.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error("DB CONNECTION FAILED", err);
  }
};

// Middlewares
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({ origin: " http://localhost:5173", credentials: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/images", express.static(join(__dirname, "/images")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/comments", commentRoute);

// Image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully!");
});

const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
