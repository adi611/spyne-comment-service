import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import commentRoutes from "./routes/commentRoutes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5002;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Comment Service running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
