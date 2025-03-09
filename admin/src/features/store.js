import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import permissionSlice  from "./permissionSlice";
import roleSlice from "./roleSlice";
import subAdminSlice from "./subAdmin";
import categorySlice from "./categorySlice";
import subCategorySlice from "./subCategorySlice";
import mainCategorySlice from "./mainCategorySlice";
import attributeSlice from "./attributeSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permission:permissionSlice,
    role:roleSlice,
    subAdmin:subAdminSlice,
    categories:categorySlice,
    subCategory:subCategorySlice,
    mainCategory:mainCategorySlice,
    attribute:attributeSlice
  },
});