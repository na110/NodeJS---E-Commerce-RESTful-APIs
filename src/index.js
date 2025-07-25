import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";

const app = express();
const port = 3002;

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/database")
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.use("/user", userRoute);

app.listen(port, () =>
  console.log(`Server running at: http://127.0.0.1:${port}`)
);
