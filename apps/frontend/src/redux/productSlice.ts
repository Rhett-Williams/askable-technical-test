import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./Store";
import { Types } from "../types/Types";

export type ProductInitialState = {
  product: Types.Product | undefined;
};

const initialCourseState: ProductInitialState = {
  product: undefined,
};

export const productSlice = createSlice({
  name: "course",
  initialState: initialCourseState,
  reducers: {
    setCourse: (state, action: PayloadAction<Types.Product>) => {
      state.product = action.payload;
    },
  },
});

export const productSelector = (state: RootState) => state.product.product;

export const { setCourse } = productSlice.actions;

export default productSlice.reducer;
