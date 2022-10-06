import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cart: [],
  totalQuantity: 0,
  bill: 0,
  err: "",
  cartCreated: false,
};

export const createCart = createAsyncThunk(
  "cart/createCart",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post("/createCart", {
        user: user._id,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ err: err });
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (user, thunkAPI) => {
    try {
      const response = await axios.get(`/myCart/${user._id}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ user, cart, bill, totalQuantity }, thunkAPI) => {
    try {
      const response = await axios.put(`/addToCart/${user._id}`, {
        products: cart,
        bill: bill,
        totalQuantity: totalQuantity,
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setCart(state, action) {
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
    setCartCreated(state, action) {
      state.cartCreated = action.payload;
    },
  },
  extraReducers: {
    [createCart.pending]: (state, action) => {
      state.cartCreated = false;
      console.log(action.type);
    },
    [createCart.fulfilled]: (state, action) => {
      state.cartCreated = true;
      state.cart = action.payload.products;
    },
    [createCart.rejected]: (state, action) => {
      state.cartCreated = false;
      state.err = action.payload;
    },
    [getCart.pending]: (state, action) => {
      return {
        ...state,
      };
    },
    [getCart.fulfilled]: (state, action) => {
      state.cart = action.payload[0];
      state.bill = action.payload[1];
      state.totalQuantity = action.payload[2];
    },
    [getCart.rejected]: (state, action) => {
      state.err = action.payload;
    },
    [addToCart.pending]: (state, action) => {
      console.log(action.type);
    },
    [addToCart.fulfilled]: (state, action) => {
      state.err = "";
    },
    [addToCart.rejected]: (state, action) => {
      state.err = action.payload;
    },
  },
});
export const {
  setCart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  setCartCreated,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
