import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import connectDB from "../config/DB.js";
import routes from "./routes/index.js";
import { configureSocket } from "./utils/socketHelper.js";

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = configureSocket(server);

app.set("io", io);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "src/uploads")));

connectDB();

routes(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
