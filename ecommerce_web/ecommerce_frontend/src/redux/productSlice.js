import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  loading: true,
  product: {},
  err: "",
};

export const getProducts = createAsyncThunk(
  //action type string
  "products/getProducts",
  async (thunkAPI) => {
    try {
      const response = await axios.get("/products");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Your Session has been expired");
    }
  }
);
export const getSpecificProduct = createAsyncThunk(
  //action type string
  "products/getSpecificProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/products/${id}`);

      return response.data;
    } catch (err) {
      console.log("error: ", err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      console.log("initial dispatching");
      console.log("type: ", action.type);

      state.loading = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      console.log("type: ", action.type);
      console.log("payload of fulfilled", action.payload);

      state.loading = false;
      state.products = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      console.log("type: ", action.type);
      //   console.log("error: ", action.payload);

      state.loading = false;
      state.err = action.payload;
      // alert(action.payload);
    },

    [getSpecificProduct.pending]: (state, action) => {
      console.log("initial dispatching");
      console.log("type: ", action.type);
      return { ...state };
    },
    [getSpecificProduct.fulfilled]: (state, action) => {
      console.log("type: ", action.type);
      console.log("payload of fulfilled", action.payload);
      state.product = action.payload;
    },
    [getSpecificProduct.rejected]: (state, action) => {
      console.log("type: ", action.type);
      state.err = action.payload;
      //   console.log("error: ", action.payload);

      // alert(action.payload);
    },
  },
});
export const productReducer = productSlice.reducer;
