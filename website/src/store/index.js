import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/CategorySlice";  // Corrected to singular form 'categorySlice'
import productSlice from "./slices/productSlice";    // Naming is good here

const store = configureStore({
  reducer: {
    categories: categorySlice,  // Use singular 'categorySlice' as per convention
    products: productSlice
  },
});

export default store;
