import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../../common/Apis/authHeader";
import axiosBaseURL, { ApiUrl } from "../../common/Apis/axiosBaseURL";
import { ToastOverError, ToastOverSuccess } from "../../common/Toast/ToastOver";
import HandleError from "../../common/Apis/HandleError";
var CryptoJS = require("crypto-js");

const initialState = {
    login: {},
    logout: {},
    isAuthenticated: false,
    loading: false,
    error: {}
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        fetchDataLoading(state) {
            state.loading = true;
        },
        fetchSetCurrentUser(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.login = action.payload;
        },
        fetchApiFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchLoginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.login = action.payload;
        }
    }
})
export const { fetchDataLoading, fetchSetCurrentUser, fetchApiFailure, fetchLoginSuccess } = authSlice.actions;

export const setCurrentUser = (value) => async (dispatch) => {
    try {
        dispatch(fetchSetCurrentUser(value));
    } catch (error) {
    }
};

export const LoginAction = (value) => async (dispatch) => {
    try {
        dispatch(fetchDataLoading());
        const data = await axiosBaseURL.post(`${ApiUrl}/login`, value, {
            headers: authHeader(true),
        });
        if(data?.data.status === false){
            ToastOverError(data?.data?.message);
        }
        else{
            var token = CryptoJS.AES.encrypt(JSON.stringify(data?.data?.data), process.env.REACT_APP_JWT_SECRET).toString();
            localStorage.setItem("security_data", token)
            dispatch(fetchLoginSuccess(data?.data?.data));
            ToastOverSuccess(data?.data?.message)
        }
        // Encrypt
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        dispatch(fetchApiFailure(error?.response?.data?.message));
    }
};

export const LogoutAction = () => async (dispatch) => {
    try {
        dispatch(fetchDataLoading());
        const data = await axiosBaseURL.post(`${ApiUrl}/logout`, {}, {
            headers: authHeader(),
        });
        if(data?.data.status === false){
            ToastOverError(data?.data?.message);
        }
        else{
            dispatch(fetchSetCurrentUser({}));
            localStorage.removeItem("security_data");
            ToastOverSuccess(data?.data?.message)
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message));
    }
};

export const ForgotPasswordAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/forgot-password', value, {
            headers: authHeader(true),
        });
        callBack(data?.data)
        if(data?.data.status === false){
            ToastOverError(data?.data?.message);
        }
        else{
            ToastOverSuccess(data?.data?.message)
        }
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
    }
};

export const ResetPasswordAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/update-password', value, {
            headers: authHeader(true),
        });
        callBack(data?.data)
        if(data?.data.status === false){
            ToastOverError(data?.data?.message);
        }
        else{
            ToastOverSuccess(data?.data?.message)
        }
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
    }
};

export const ChangePasswordAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/change-password', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        if(data?.data.status === false){
            ToastOverError(data?.data?.message);
        }
        else{
            ToastOverSuccess(data?.data?.message)
        }
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};



export default authSlice.reducer;