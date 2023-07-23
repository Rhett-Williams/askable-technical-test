import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import productReducer from "./productSlice";
import API from "./Api";

export const store = configureStore({
  reducer: {
    product: productReducer,
    [API.reducerPath]: API.reducer,
  },
  devTools: true,

  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(API.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAskableDispatch = () => useDispatch<AppDispatch>();
export const useAskableSelector: TypedUseSelectorHook<RootState> = useSelector;
