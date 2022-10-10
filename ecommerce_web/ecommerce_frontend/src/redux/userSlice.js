import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const SignUp = createAsyncThunk(
  "user/signup",

  async ({ fullname, email, password, phone }, thunkAPI) => {
    try {
      const response = await axios.post("/signup", {
        fullname: fullname,
        email: email,
        password: password,
        phone: phone,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);
export const login = createAsyncThunk(
  "user/login",

  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post("/login", {
        email: email,
        password: password,
      });
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isloggedIn: false,
    err: null,
    loading: true,
    loggedUser: null,
    isSignedUp: false,
    user: null,
  },
  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: action.payload,
      };
    },
    setLoggedUser(state, action) {
      return { ...state, loggedUser: action.payload };
    },
    setIsLoggedIn(state, action) {
      return {
        ...state,
        isloggedIn: action.payload,
      };
    },
  },
  extraReducers: {
    [SignUp.pending]: (state) => {
      return {
        ...state,
        loading: true,
        isSignedUp: false,
      };
    },
    [SignUp.fulfilled]: (state, action) => {
      const { user } = action.payload;
      return { ...state, loading: false, isSignedUp: true, user: user };
    },
    [SignUp.rejected]: (state, action) => {
      const { err } = action.payload;
      return { ...state, err: err, isSignedUp: false };
    },
    [login.pending]: (state) => {
      return { ...state };
    },
    [login.fulfilled]: (state, action) => {
      const { user } = action.payload;
      return {
        ...state,
        user: user,
        isloggedIn: true,
        loggedUser: user,
        err: null,
      };
    },
    [login.rejected]: (state, action) => {
      state.err = action.payload;
      state.isloggedIn = false;
    },
  },
});
const { reducer, actions } = userSlice;
export const { setLoggedUser, setUser, setIsLoggedIn } = actions;
export default reducer;
