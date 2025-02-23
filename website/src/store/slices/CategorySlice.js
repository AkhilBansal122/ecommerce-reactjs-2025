import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';
import axios from 'axios';

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

export const fetchCategories = () => async (dispatch) => {
  try {
    // Dispatch setLoading to indicate the API call has started
    dispatch(setLoading());

    // Simulate an API call using fetch or axios
    const response = await axios.get(`${config.baseURL}web/active-category`); // API call to fetch categories

    if (response.data.status === true) {
      dispatch(setCategories(response.data.data));
    }
  } catch (error) {
    // Dispatch setError if the API call fails
    dispatch(setError(error.message || 'Something went wrong'));
  }
};