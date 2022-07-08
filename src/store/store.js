import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import pizzas from './slices/pizzasSlice';

export const store = configureStore({
  reducer: {
    filter,
    pizzas,
  },
});
