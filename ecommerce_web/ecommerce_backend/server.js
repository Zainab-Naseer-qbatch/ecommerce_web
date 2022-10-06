import express from "express";
import { db } from "./dbConnection.js";
import * as dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { productRouter } from "./routes/productRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(PORT, () => {
  console.log("app started!");
});
