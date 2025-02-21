import { configureStore } from "@reduxjs/toolkit";
import categoriesSlices from "./slices/CategorySlice";

const store = configureStore({
    reducer:{
        categories : categoriesSlices
    }
})
export default store;