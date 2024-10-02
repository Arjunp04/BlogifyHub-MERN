import multer from "multer";

// Use memory storage to store files in memory
const storage = multer.memoryStorage();

// Initialize Multer with memory storage
const upload = multer({ storage });

export default upload;

