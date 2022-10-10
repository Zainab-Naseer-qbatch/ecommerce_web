import express from "express";
import Product from "../models/products.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/products", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products: products });
  } catch (err) {
    res.json({ success: false, err: err?.message });
  }
});

router.get("/products/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (product) {
      res.status(200).json({ success: true, product: product });
    } else {
      res.status(404).json({ success: false, err: "Product not Found" });
    }
  } catch (err) {
    res.status(400).json({ success: false, err: err?.message });
  }
});

export default router;
