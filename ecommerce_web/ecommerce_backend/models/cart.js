import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      totalPrice: { type: Number, default: 0 },
    },
  ],
  bill: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },
});

const cart = model("cart", cartSchema);
export default cart;
