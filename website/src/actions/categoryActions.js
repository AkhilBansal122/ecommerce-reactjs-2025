// src/actions/categoryActions.js
import axios from 'axios';  // Import axios
import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE } from './types';
import config from '../config';  // Import config for base URL

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Async action to fetch categories using axios
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  
  try {
    // Make the API request using axios
    const response = await axios.get(`${config.baseURL}web/active-category`);
    
   if(response.status===200){
    console.log(response.data.data);
    dispatch(fetchCategoriesSuccess(response?.data?.data));

   }
  } catch (error) {
    // If there's an error, dispatch failure
    dispatch(fetchCategoriesFailure(error.message));
  }
};
