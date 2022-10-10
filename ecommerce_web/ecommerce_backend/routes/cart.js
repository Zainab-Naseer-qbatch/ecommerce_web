import express from "express";
import Cart from "../models/cart.js";

const router = express.Router();

router.post("/createCart", async (req, res) => {
  const { user } = req.body;
  try {
    const cart = await Cart.create({
      user: user,
    });
    res.status(201).json({ success: true, cart: cart });
  } catch (err) {
    res.json({ success: false, err: err?.message });
  }
});

router.put("/addToCart/:user", async (req, res) => {
  const { user } = req.params;
  const { products, bill, totalQuantity } = req.body;
  try {
    await Cart.findOneAndUpdate(
      { user: user },
      {
        $set: {
          products: products,
          bill: bill,
          totalQuantity: totalQuantity,
        },
      }
    );
    res.status(200).json({ success: true, message: "Cart updated" });
  } catch (err) {
    res.json({ sucess: false, err: "Cart updation failed" });
  }
});

router.get("/myCart/:user", async (req, res) => {
  const { user } = req.params;

  try {
    const data = await Cart.findOne({ user: user }).lean().populate({
      path: "products._id",
      model: "product",
    });
    const { products, bill, totalQuantity } = data;

    let items = [];
    for (let i = 0; i < products.length; i++) {
      const { _id, quantity, totalPrice } = products[i];
      const item = {
        ..._id,
        quantity,
        totalPrice,
      };
      items.push(item);
    }

    const cart = {
      products: items,
      bill,
      totalQuantity,
    };

    return res.status(200).json({ success: true, cart: cart });
  } catch (err) {
    res.json({ success: false, err: err?.message });
  }
});

export default router;
