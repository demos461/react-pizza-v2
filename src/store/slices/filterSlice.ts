import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type SortType = {
  name: 'популярности' | 'цене' | 'алфавиту';
  sortProperty: 'rating' | 'price' | 'title';
  order: 'asc' | 'desc';
};

type FilterStateType = {
  search: string;
  category: number;
  sort: SortType;
};

const initialState: FilterStateType = {
  search: '',
  category: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    order: 'asc',
  },
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sort.order = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setCategory, setSort, setSearch, setOrder } = filterSlice.actions;

export const selectCategory = (state: RootState) => state.filter.category;
export const selectSort = (state: RootState) => state.filter.sort;
export const selectSearch = (state: RootState) => state.filter.search;
export const selectSortProperty = (state: RootState) => state.filter.sort.sortProperty;
export const selectSortOrder = (state: RootState) => state.filter.sort.order;

export default filterSlice.reducer;
