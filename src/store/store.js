import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import pizzas from './slices/pizzasSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    filter,
    pizzas,
    cart,
  },
});
