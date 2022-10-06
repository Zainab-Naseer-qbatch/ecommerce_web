import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlice";
import { userReducer } from "./userSlice";
import { productReducer } from "./productSlice";

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
const persistConfigProduct = { key: "products", storage };
const persistedReducer1 = persistReducer(persistConfigUser, userReducer);
const persistedReducer2 = persistReducer(persistConfig, cartReducer);
const persistedReducer3 = persistReducer(persistConfigProduct, productReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer1,
    cart: persistedReducer2,
    products: persistedReducer3,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
