import express from "express";
import connectDB from "../config/DB.js";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path";



dotenv.config();

const app = express();

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, //allow to send and receive cookies from backend
  }),
);

app.use(express.json());

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
