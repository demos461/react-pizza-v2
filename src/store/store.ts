import { configureStore } from '@reduxjs/toolkit';
import pizzas from './slices/pizzasSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    pizzas,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
