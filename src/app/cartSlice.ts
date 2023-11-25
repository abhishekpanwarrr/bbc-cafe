import { createSlice } from '@reduxjs/toolkit';
import { ImageProps } from 'react-native';

export interface CartItem {
  _id: string;
  name: string;
  imagelink_square: ImageProps[];
  description: string;
  ingredients: string;
  price: string;
  quantity: string;
}

interface FavouriteList {
  id: string;
}

export interface CartState {
  cart: CartItem[];
  favourite: FavouriteList[];
  totalQuantity: number; // Add totalQuantity field
}

const initialState: CartState = {
  cart: [],
  favourite: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item._id === newItem._id);

      if (existingItem) {
        existingItem.quantity += parseInt(action.payload.quantity, 10);
      } else {
        state.cart.push(newItem);
      }

      state.totalQuantity = state.cart.reduce((total, item) => total + parseInt(item.quantity, 10), 0);
    },
    emptyCart: (state) => {
      state.cart = [];
      state.totalQuantity = 0;
    },
    minusQuantity: (state, action) => {
      const id = action.payload;
      const coffee = state.cart.find((item) => item._id === id);

      if (coffee) {
        if (parseInt(coffee.quantity, 10) > 1) {
          coffee.quantity = (parseInt(coffee.quantity, 10) - 1).toString();
        } else {
          state.cart = state.cart.filter((item) => item._id !== id);
        }

        state.totalQuantity = state.cart.reduce((total, item) => total + parseInt(item.quantity, 10), 0);
      }
    },
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const coffee = state.cart.find((item) => item._id === id);

      if (coffee) {
        coffee.quantity = (parseInt(coffee.quantity, 10) + 1).toString();
        state.totalQuantity = state.cart.reduce((total, item) => total + parseInt(item.quantity, 10), 0);
      }
    },
    addToFavourite: (state, action) => {
      const id = action.payload.id;

      if (state.favourite.some((item) => item.id === id)) {
        state.favourite = state.favourite.filter((item) => item.id !== id);
      } else {
        state.favourite.push(action.payload);
      }
    },
    removeFromFavourite: (state, action) => {
      const id = action.payload;
      if (state.favourite.some((item) => item.id === id)) {
        state.favourite = state.favourite.filter((item) => item.id !== id);
      }
    },
  },
});

// Selector to get total quantity
export const selectTotalQuantity = (state:any) => state.cart.totalQuantity;

// Action creators are generated for each case reducer function
export const { addToCart, emptyCart, addToFavourite, removeFromFavourite, minusQuantity, increaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
