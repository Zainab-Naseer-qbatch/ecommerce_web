import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isloggedIn: false,
  err: null,
  loading: true,
  loggedUser: null,
  isSignedUp: false,
  user: null,
};
export const SignUp = createAsyncThunk(
  "user/signup",

  async ({ fullname, email, password, phone }, thunkAPI) => {
    console.log("inside signup thunk...");
    try {
      const response = await axios.post("/signup", {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
      });
      console.log("after signing up: ", response.data);
      return response.data;
    } catch (err) {
      console.log("error in signup ", err);

      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);
export const login = createAsyncThunk(
  "user/login",

  async ({ email, password }, thunkAPI) => {
    console.log("inside login thunk...");
    console.log("email: ", email, password);
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      console.log("after loging : ", response.data);
      return response.data;
    } catch (err) {
      console.log("error in login ", err);
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setLoggedUser(state, action) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isloggedIn = action.payload;
    },
  },
  extraReducers: {
    [SignUp.pending]: (state, action) => {
      state.loading = true;
      state.isSignedUp = false;
    },
    [SignUp.fulfilled]: (state, action) => {
      state.loading = false;
      state.isSignedUp = true;

      console.log("user payload: ", action.payload);
      state.user = action.payload;

      state.isSignedUp = true;
    },
    [SignUp.rejected]: (state, action) => {
      state.err = action.payload.err;
      state.isSignedUp = false;
    },
    [login.pending]: (state) => {
      console.log("pending...");
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isloggedIn = true;
      state.loggedUser = action.payload;
      state.err = null;
    },
    [login.rejected]: (state, action) => {
      console.log("error: ", action.payload);
      state.err = action.payload;
      state.isloggedIn = false;
    },
  },
});
export const { setLoggedUser, setUser, setIsLoggedIn } = userSlice.actions;
export const userReducer = userSlice.reducer;
