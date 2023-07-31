"use client";

import { Product } from "@/app/models/product";
import { createSlice } from "@reduxjs/toolkit";

export interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
