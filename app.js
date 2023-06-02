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

function errorHandler(error, _req, res, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(500).json({ error: "Invalid ID format" });
  }
  next(error);
}

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/api/persons", personRouter);
app.use(errorHandler);

export default app;
