import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';
import { CartItem } from './cartSlice';

export const selectCart = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cart
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);
