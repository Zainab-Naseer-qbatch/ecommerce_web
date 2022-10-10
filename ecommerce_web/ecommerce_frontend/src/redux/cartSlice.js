import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (user, { rejectWithValue }) => {
    const { _id } = user;
    try {
      const response = await axios.post("/createCart", {
        user: _id,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/myCart/${user._id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ user, cart, bill, totalQuantity }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/addToCart/${user._id}`, {
        products: cart,
        bill: bill,
        totalQuantity: totalQuantity,
      });
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalQuantity: 0,
    bill: 0,
    err: "",
    cartCreated: false,
  },
  reducers: {
    setCart(state, action) {
      const { products, bill, totalQuantity } = action.payload;
      return {
        ...state,
        cart: products,
        bill,
        totalQuantity,
      };
    },
    addProductToCart(state, action) {
      const { _id, price } = action.payload;
      const isAdded = state.cart.find((product) => product._id === _id);
      if (isAdded) {
        isAdded.quantity += 1;
        isAdded.totalPrice = price * isAdded.quantity;
        state.bill += isAdded.price;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          totalPrice: price,
        });
        state.bill += price;
      }
      state.totalQuantity += 1;
    },

    increaseQuantity(state, action) {
      const { _id, price } = action.payload;
      const product = state.cart.find((product) => product._id === _id);
      product.quantity += 1;
      product.totalPrice = price * product.quantity;
      state.bill += product.price;

      state.totalQuantity += 1;
    },
    decreaseQuantity(state, action) {
      const { _id, price } = action.payload;

      const product = state.cart.find((product) => product._id === _id);
      if (product.quantity > 1) {
        product.quantity -= 1;
        product.totalPrice = price * product.quantity;
        state.bill -= product.price;
        state.totalQuantity -= 1;
      }
    },
    removeProduct(state, action) {
      const { _id, quantity, totalPrice } = action.payload;
      const filteredCart = state.cart.filter((product) => product._id !== _id);

      state.totalQuantity -= quantity;
      state.bill -= totalPrice;
      state.cart = filteredCart;
    },
    setCartCreated(state, action) {
      const { payload } = action;
      return {
        ...state,
        cartCreated: payload,
      };
    },
  },
  extraReducers: {
    [createCart.pending]: (state, action) => {
      return {
        ...state,
        cartCreated: false,
      };
    },
    [createCart.fulfilled]: (state, action) => {
      const { products } = action.payload.cart.products;
      return {
        ...state,
        err: "",
        cartCreated: true,
        cart: products,
      };
    },
    [createCart.rejected]: (state, action) => {
      const { err } = action.payload.err;
      return {
        ...state,
        cartCreated: false,
        err,
      };
    },
    [getCart.pending]: (state, action) => {
      return {
        ...state,
      };
    },
    [getCart.fulfilled]: (state, action) => {
      const { products, bill, totalQuantity } = action.payload?.cart;
      return {
        ...state,
        err: "",
        cart: products,
        bill,
        totalQuantity,
      };
    },
    [getCart.rejected]: (state, action) => {
      const { err } = action.payload;
      return {
        ...state,
        err,
      };
    },
    [addToCart.pending]: (state, action) => {
      return {
        ...state,
      };
    },
    [addToCart.fulfilled]: (state) => {
      return { ...state, err: "" };
    },
    [addToCart.rejected]: (state, action) => {
      const { err } = action.payload.err;
      return {
        ...state,
        err,
      };
    },
  },
});
const { reducer, actions } = cartSlice;
export const {
  setCart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  setCartCreated,
} = actions;
export default reducer;
