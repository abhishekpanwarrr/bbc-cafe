import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import cartReducer from './cartSlice';
import userReducer, { initializeUser } from './user/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
  middleware: [thunk],
});
store.dispatch(initializeUser());

export default store;
