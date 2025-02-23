import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';
import axios from 'axios';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    productList: [],  // Changed from categoryList to productList for consistency
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProducts: (state, action) => {
      state.loading = false;
      state.productList = action.payload;  // Changed categoryList to productList
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setLoading, setProducts, setError } = productSlice.actions;
export default productSlice.reducer;

// Async action to fetch products
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading());

    // API call to fetch products using Axios
    const response = await axios.get(`${config.baseURL}web/active-product`);

    if (response.data.status === true) {
      dispatch(setProducts(response.data.data));
    } else {
      dispatch(setError('Failed to fetch products'));
    }
  } catch (error) {
    dispatch(setError(error.message || 'Something went wrong'));
  }
};
