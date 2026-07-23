import express from "express";
import connectDB from "../config/DB.js";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

connectDB();

routes(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
