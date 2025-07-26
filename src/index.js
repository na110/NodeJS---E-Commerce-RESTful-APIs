import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

const app = express();
const port = 3002;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/database")
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

app.use("/user", userRoute);
app.use("/products", productRoute);

app.listen(port, () =>
  console.log(`Server running at: http://127.0.0.1:${port}`)
);
