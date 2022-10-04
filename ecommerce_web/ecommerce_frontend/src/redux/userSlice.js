import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null };
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loggedUser(state, action) {
      console.log("inside user reducer: ", action.payload);
      state.user = action.payload;
    },
  },
});
export const { loggedUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
