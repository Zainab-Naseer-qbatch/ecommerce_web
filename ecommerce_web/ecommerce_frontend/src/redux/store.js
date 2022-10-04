import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const persistConfigUser = {
  key: "user",
  storage,
};
const persistedReducer1 = persistReducer(persistConfigUser, userReducer);
const persistedReducer2 = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer1,
    cart: persistedReducer2,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
