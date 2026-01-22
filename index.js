import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./server/database/db.js";
import userRoute from "./server/routes/user.routes.js";
import courseRoute from "./server/routes/course.routes.js";

dotenv.config({});

//callling database
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;
//default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true
}));
//apis
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);


app.listen(PORT, () => {
    console.log(`server listen at port ${PORT}`);
})