import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

enum STATUS {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type PizzaItemType = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

type PizzasStateType = {
  items: PizzaItemType[];
  status: STATUS;
};

type fetchPizzasArgsType = {
  search: string;
  category: number;
  sort: string;
  order: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItemType[], fetchPizzasArgsType>(
  'pizzas/fetchPizzas',
  async params => {
    const { search, category, sort, order } = params;
    const { data } = await axios.get<PizzaItemType[]>(
      `https://62a62676b9b74f766a447cc7.mockapi.io/items?search=${search}&${
        category > 0 ? `category=${category}` : ''
      }&sortBy=${sort}&order=${order}`,
    );
    return data;
  },
);

const initialState: PizzasStateType = {
  items: [],
  status: STATUS.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPizzas.pending, state => {
      state.status = STATUS.LOADING;
    });
    builder.addCase(
      fetchPizzas.fulfilled,
      (state, action: PayloadAction<PizzaItemType[]>) => {
        state.items = action.payload;
        state.status = STATUS.SUCCESS;
      },
    );
    builder.addCase(fetchPizzas.rejected, state => {
      state.status = STATUS.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzasData = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;
