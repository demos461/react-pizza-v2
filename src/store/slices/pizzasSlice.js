import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

export const pizzasSlice = createSlice({
  name: 'pizzasSlice',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
});

export const { setSearchValue } = pizzasSlice.actions;

export default pizzasSlice.reducer;
