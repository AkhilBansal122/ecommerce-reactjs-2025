import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categoryList: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCategories: (state, action) => {
      state.loading = false;
      state.categoryList = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setCategories, setError } = categorySlice.actions;
export default categorySlice.reducer;
