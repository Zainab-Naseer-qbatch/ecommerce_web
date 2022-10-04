import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [], totalQuantity: 0, bill: 0 };
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart(state, action) {
      console.log("set cart dispacthed");
      // console.log("bill in set cart: ", action.payload);
      console.log("cart state in payload", action.payload);
      console.log("cart state in state", state.totalQuantity);

      state.cart = action.payload.products;
      state.bill = action.payload.bill;
      state.totalQuantity = action.payload.totalQuantity;
    },
    addProductToCart(state, action) {
      const isAdded = state.cart.find(
        (product) => product._id === action.payload._id
      );
      if (isAdded) {
        isAdded.quantity += 1;
        isAdded.totalPrice = action.payload.price * isAdded.quantity;
        state.bill += isAdded.price;

        console.log("bill in cart slice: ", state.bill);
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
        state.bill += action.payload.price;
      }
      state.totalQuantity += 1;
    },

    increaseQuantity(state, action) {
      const product = state.cart.find(
        (product) => product._id === action.payload._id
      );
      product.quantity += 1;
      product.totalPrice = action.payload.price * product.quantity;
      state.bill += product.price;

      state.totalQuantity += 1;
    },
    decreaseQuantity(state, action) {
      const product = state.cart.find(
        (product) => product._id === action.payload._id
      );
      if (product.quantity > 1) {
        product.quantity -= 1;
        product.totalPrice = action.payload.price * product.quantity;
        state.bill -= product.price;
        state.totalQuantity -= 1;
      }
    },
    removeProduct(state, action) {
      const quantity = action.payload.quantity;
      const totalPrice = action.payload.totalPrice;
      const filteredCart = state.cart.filter(
        (product) => product._id !== action.payload._id
      );
      state.totalQuantity -= quantity;
      state.bill -= totalPrice;
      state.cart = filteredCart;
    },
  },
});
export const {
  setCart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
