import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setSort } = filterSlice.actions;

export default filterSlice.reducer;
