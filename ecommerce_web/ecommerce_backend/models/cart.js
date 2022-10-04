import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      totalPrice: { type: Number, default: 0 },
    },
  ],
  bill: { type: Number, default: 0 },
  totalQuantity: { type: Number, default: 0 },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const cart = model("cart", cartSchema);
