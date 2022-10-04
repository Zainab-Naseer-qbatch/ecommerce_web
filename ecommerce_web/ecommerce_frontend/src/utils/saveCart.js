import axios from "axios";

export const saveCart = async (user, cart, bill, totalQuantity) => {
  try {
    await axios.put(`/addToCart/${user._id}`, {
      products: cart,
      bill: bill,
      totalQuantity: totalQuantity,
    });
  } catch (err) {
    console.log("error in saving cart: ", err);
  }
};
