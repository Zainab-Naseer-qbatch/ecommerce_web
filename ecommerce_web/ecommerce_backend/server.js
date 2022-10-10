import express from "express";
import db from "./dbConnection.js";
import * as dotenv from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(router);
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.listen(PORT, () => {
  console.log("app started!");
});
