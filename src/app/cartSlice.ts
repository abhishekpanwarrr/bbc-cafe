import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ImageProps } from 'react-native'; // Make sure to import ImageProps from the correct path

export interface CartItem {
  id: string;
  name: string;
  image: ImageProps;
  description: string;
  ingredients: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(newItem);
      }
    },
    emptyCart: (state, action) => {
      state.cart = []
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;