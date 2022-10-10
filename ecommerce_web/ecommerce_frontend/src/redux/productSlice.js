import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
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
  "products/getSpecificProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/${id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    product: {},
    err: "",
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      return {
        ...state,
        loading: true,
      };
    },
    [getProducts.fulfilled]: (state, action) => {
      const { products } = action.payload;
      return {
        ...state,
        loading: false,
        products: products,
      };
    },
    [getProducts.rejected]: (state, action) => {
      const { err } = action.payload;
      return {
        ...state,
        loading: false,
        err,
      };
    },

    [getSpecificProduct.pending]: (state, action) => {
      return { ...state };
    },
    [getSpecificProduct.fulfilled]: (state, action) => {
      const { product } = action.payload;
      return {
        ...state,
        product: product,
      };
    },
    [getSpecificProduct.rejected]: (state, action) => {
      const { err } = action.payload;
      return {
        ...state,
        err,
      };
    },
  },
});
const { reducer } = productSlice;
export default reducer;
