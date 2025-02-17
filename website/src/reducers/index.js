// src/reducers/index.js
import { combineReducers } from 'redux';
import categoryReducer from './categoryReducer';

const rootReducer = combineReducers({
  categories: categoryReducer,
  // other reducers
});

export default rootReducer;
