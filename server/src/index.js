import express from "express";
import connectDB from "../config/DB.js";
import taskRoutes from "./routes/taskRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/tasks", taskRoutes);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
