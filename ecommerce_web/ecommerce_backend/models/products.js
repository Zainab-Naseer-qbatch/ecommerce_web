import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: String,
  image: {
    type: String,
  },
  price: Number,
  rating: Number,
});
const product = mongoose.model("product", productSchema);
export default product;
