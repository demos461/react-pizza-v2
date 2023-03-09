import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemsType = {
  id: number;
  title: string;
  type: string;
  size: number;
  price: number;
  count: number;
  imageUrl: string;
};

type CartStateType = {
  totalPrice: number;
  items: CartItemsType[];
};

const initialState: CartStateType = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItemsType>) => {
      const findItem = state.items.find(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    removeItem: (state, action: PayloadAction<CartItemsType>) => {
      const index = state.items.findIndex(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (index !== -1) {
        state.items.splice(index, 1);
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
    clearItems: state => {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem: (state, action: PayloadAction<CartItemsType>) => {
      const findItem = state.items.find(
        obj =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      if (findItem) {
        if (findItem.count > 1) findItem.count--;
      }
      state.totalPrice = state.items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemByOptions =
  (id: number, type: string, size: number) => (state: RootState) =>
    state.cart.items.find(obj => obj.id === id && obj.type === type && obj.size === size);

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
