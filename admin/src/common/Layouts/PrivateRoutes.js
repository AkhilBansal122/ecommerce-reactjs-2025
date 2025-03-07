import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, } from "react-router-dom";

export const PrivateRoutes = () => {
   return localStorage.security_data ? <Outlet /> : <Navigate to="/login" />
}