import { configureStore } from '@reduxjs/toolkit';
import pizzas from './slices/pizzasSlice';
import cart from './slices/cartSlice';
import filter from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    pizzas,
    cart,
    filter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
