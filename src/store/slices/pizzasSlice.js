import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
  const { searchQuery, categoryQuery, sortQuery } = params;
  const { data } = await axios.get(`https://62a62676b9b74f766a447cc7.mockapi.io/items?search=${searchQuery}&${
    categoryQuery > 0 ? `category=${categoryQuery}` : ''
  }&sortBy=${sortQuery}&order=desc`);
  return data;
});

const initialState = {
  items: '',
  status: 'loading',
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzasData = (state) => state.pizzas;

export default pizzasSlice.reducer;
