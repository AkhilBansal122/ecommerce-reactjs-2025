// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './reducers/categoryReducer';  // Your category reducer

const store = configureStore({
  reducer: {
    categories: categoryReducer,
  },
});

export default store;
