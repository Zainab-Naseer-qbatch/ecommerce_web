import express from "express";
import { cart } from "../models/cart.js";

export const cartRouter = express.Router();
cartRouter.use(express.json());

//---------------------------------------Create Cart for the User---------------------------------------
cartRouter.post("/createCart", async (req, res) => {
  try {
    const myCart = new cart({
      user: req.body.user,
    });
    const cart_ = await myCart.save();
    res.status(201).send(cart_);
  } catch (err) {
    console.log("Error in creating cart: ", err);
    res.status(500).send(err);
  }
});

//---------------------------------------Update Cart---------------------------------------
cartRouter.put("/addToCart/:user", async (req, res) => {
  console.log("cart in body: ", req.body.products);
  try {
    const myCart = await cart.findOneAndUpdate(
      { user: req.params.user },
      {
        $set: {
          products: req.body.products,
          bill: req.body.bill,
          totalQuantity: req.body.totalQuantity,
        },
      }
    );
    console.log("cart after updation", myCart);
    res.status(200).send("Cart updated");
  } catch (err) {
    res.status(500).send("Cart updation failed");
  }
});

// cartRouter.put("/addToCart/:user/:p_id", async (req, res) => {

//   try {
//     console.log("inside try block");
//     const myCart = await cart.find({ user: req.params.user });
//     let cart_id;
//     let isExists = await cart.count({
//       user: req.params.user,
//       "products.product": req.params.p_id,
//     });

//     // cart_id = mycart[0]._id;
//     if (myCart && isExists) {
//       try {
//         const updatedCart = await cart.updateOne(
//           {
//             products: { product: req.params.p_id },
//           },
//           { products: { $inc: { quantity: 1 } } }
//         );
//         console.log("up: ", updatedCart.modifiedCount);
//         if (updatedCart.modifiedCount === 0) {
//           throw Error("Cart updation Failed");
//         } else {
//           res.status(200).send("Cart Updated");
//           console.log("cart updated", updatedCart);
//         }
//       } catch (err) {
//         res.status(500).send("Cart Updation Failed");
//         console.log("Err", err);
//       }
//     } else {
//       const isAdded = await cart.updateOne(
//         { user: req.params.user },
//         { $push: { products: { product: req.params.p_id, quantity: 1 } } }
//       );
//       res.status(200).send("Product added to the Cart");
//     }

//   } catch (err) {
//     console.log("err... ", err);
//     res.status(404).send("User doesn't exists");
//   }
// });

//---------------------------------------Get Cart---------------------------------------
cartRouter.get("/myCart/:user", async (req, res) => {
  const cartData = [];
  const items = [];
  try {
    const data = await cart
      .find({ user: req.params.user })
      .populate({ path: "products._id", model: "Product" });
    for (let i = 0; i < data[0].products.length; i++) {
      const product = {
        _id: data[0].products[i]._id._id,
        name: data[0].products[i]._id.name,
        desc: data[0].products[i]._id.desc,
        price: data[0].products[i]._id.price,
        rating: data[0].products[i]._id.rating,
        image: data[0].products[i]._id.image,
        quantity: data[0].products[i].quantity,
        totalPrice: data[0].products[i].totalPrice,
      };
      items.push(product);
    }
    cartData.push(items);
    cartData.push(data[0].bill);
    cartData.push(data[0].totalQuantity);

    // res.send(data);
    res.send(cartData);
    console.log("Cart data in get cart api", cartData);
  } catch (err) {
    res.status(500).send(err);
    console.log("err", err);
  }
});
