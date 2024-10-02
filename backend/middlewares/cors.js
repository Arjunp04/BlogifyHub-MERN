// middlewares/cors.js
import cors from "cors";

const allowedOrigins = [
  "https://blogifyhub.vercel.app",
  "http://localhost:5173", // Change the port if needed
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

export default cors(corsOptions);
