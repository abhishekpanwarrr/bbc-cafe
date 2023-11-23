import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ImageProps } from 'react-native'; // Make sure to import ImageProps from the correct path

export interface CartItem {
  _id: string;
  name: string;
  imagelink_square: ImageProps;
  description: string;
  ingredients: string;
  price: number;
  quantity: number;
}
interface FavouriteList {
  id: string
}
export interface CartState {
  cart: CartItem[];
  favourite: FavouriteList[]
}

const initialState: CartState = {
  cart: [],
  favourite: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(newItem);
      }
    },
    emptyCart: (state, action) => {
      state.cart = []
    },
    addToFavourite: (state, action) => {
      const id = action.payload.id;

      if (state.favourite.some(item => item.id === id)) {
        state.favourite = state.favourite.filter(item => item.id !== id);
      } else {
        console.log("false");
        state.favourite.push(action.payload);
      }
    },
    removeFromFavourite: (state, action) => {
      const id = action.payload
      if (state.favourite.some(item => item.id === id)) {
        console.log("state",state.favourite.length);
        state.favourite = state.favourite.filter(item => item.id !== id);
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, emptyCart, addToFavourite, removeFromFavourite } = cartSlice.actions;

export default cartSlice.reducer;