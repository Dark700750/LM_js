import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import connectDB from "./server/database/db.js";
import userRoute from "./server/routes/user.routes.js";
import courseRoute from "./server/routes/course.routes.js";
import errorHandler from "./server/middlewares/error.middleware.js";

dotenv.config();

// connect database
connectDB();

const app = express();
const PORT = process.env.PORT || 10000;

// Security & Optimization Middleware
app.use(helmet());
app.use(compression());
app.use(morgan("dev")); // Log requests

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later."
});
app.use("/api", limiter);

// middlewares
app.use(express.json({ limit: "10kb" })); // Limit body size
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://lm-js-16.onrender.com",
    credentials: true,
  })
);

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

// health check
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running production ready!"
  });
});

// Handle unhandled routes
app.all("*", (req, res, next) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
});

// Global Error Handler
app.use(errorHandler);

// listen
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
