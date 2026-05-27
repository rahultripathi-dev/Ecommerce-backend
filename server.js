import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(8000, () => {
      console.log("Server running on 8000");
    });
  })
  .catch((err) => {
    console.log(err);
  });