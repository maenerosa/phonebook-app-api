import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./utils/config.js";
import personRouter from "./routes/personRouter.js";

const app = express();

const connectToDB = async (url) => {
  await mongoose.connect(url);
  console.log("Connected to DB");
};

connectToDB(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/persons", personRouter);

export default app;
