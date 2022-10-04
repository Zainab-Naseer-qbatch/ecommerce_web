import express from "express";
import { Product } from "../models/products.js";
import { authenticateUser } from "../middlewares/auth.js";

export const productRouter = express.Router();

///---------------------------------------Get All Products---------------------------------------
productRouter.get("/products", authenticateUser, (req, res) => {
  Product.find({}).then((data) => {
    res.send(data);
  });
});

//---------------------------------------Get specific Product---------------------------------------
productRouter.get("/products/:id", authenticateUser, (req, res) => {
  //   console.log("id: ", req.params.id.toString());
  Product.findById(req.params.id)
    .then((data) => {
      console.log(data);
      if (data != null) {
        res.send(data);
      } else {
        res.status(404).send("Product not Found");
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(400).send("Cast to ObjectId failed");
    });
});
