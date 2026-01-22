import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/temp'); // Use server temp directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10 // 10MB limit
  }
});

export default upload;