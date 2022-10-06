import express from "express";
import { Product } from "../models/products.js";
import { authenticateUser } from "../middlewares/auth.js";

export const productRouter = express.Router();

///---------------------------------------Get All Products---------------------------------------
productRouter.get("/products", authenticateUser, async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});

//---------------------------------------Get specific Product---------------------------------------
productRouter.get("/products/:id", authenticateUser, async (req, res) => {
  //   console.log("id: ", req.params.id.toString());
  try {
    const product = await Product.findById(req.params.id);

    if (product != null) {
      res.send(product);
    } else {
      res.status(404).send("Product not Found");
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(400).send("Cast to ObjectId failed");
  }
});
