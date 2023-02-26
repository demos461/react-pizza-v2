import { configureStore } from '@reduxjs/toolkit';
import pizzas from './slices/pizzasSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    pizzas,
    cart,
  },
});
