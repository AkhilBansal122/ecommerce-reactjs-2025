import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth/authSlice";
import permissionSlice  from "./permissionSlice";
import roleSlice from "./roleSlice";
import subAdminSlice from "./subAdmin"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    permission:permissionSlice,
    role:roleSlice,
    subAdmin:subAdminSlice
  },
});