import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../common/Apis/authHeader";
import axiosBaseURL, { ApiUrl } from "../common/Apis/axiosBaseURL";
import { ToastOverError, ToastOverSuccess } from "../common/Toast/ToastOver";
import HandleError from "../common/Apis/HandleError";

const initialState = {
    mainCategoryList: [],  // List of role for the current page
    currentPage: 1,      // Current page number
    totalPages: 1,       // Total number of pages
    pageSize: 10,        // Number of items per page
    totalItems: 0,       // Total number of items
    loading: false,      // Loading state for data fetch
    error: null,         // Error message
    activeMainCategoryList: [],
    
};
const mainCategorySlice = createSlice({
    name: "mainCategory",
    initialState,
    reducers: {
        fetchDataLoading(state) {
            state.loading = true;
        },
        fetchApiFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchMainCategorylistSuccess(state, action) {
            state.loading = action.payload.loading;
            state.mainCategoryList = action.payload.mainCategorylist;
            state.currentPage = action.payload.currentPage;
            state.totalPages = action.payload.totalPages;
            state.pageSize = action.payload.pageSize;
            state.totalItems = action.payload.totalItems;
        },
        setPage(state, action) {
            state.currentPage = action.payload; // Update the current page number
        },
        setPageSize(state, action) {
            state.pageSize = action.payload; // Update the page size
        },
        fetchActiveMainCategoryListSuccess(state, action) {
            state.loading = action.payload.loading;
            state.activeMainCategoryList = action.payload.data;
        },
          // New action to reset the category list
          resetMainCategoryList() {
            return initialState;
        },
    }
});
export default mainCategorySlice.reducer;

export const { fetchDataLoading, fetchApiFailure, fetchcaotegorylistSuccess,fetchActiveMainCategoryListSuccess, setPage, setPageSize,resetCategoryList,fetchMainCategorylistSuccess,resetMainCategoryList } = mainCategorySlice.actions;

export const addMainCategoryAction = (value, callBack) => async (dispatch) => {
    try {
        // Make API request
        const { data } = await axiosBaseURL.post(`${ApiUrl}/main-category-create`, value, {
            headers: authHeader(),
        });

        callBack(data); // Pass response data to the callback

        // Show appropriate toast message based on response
        if (data.status === false) {
            ToastOverError(data.message);
        } else {
            ToastOverSuccess(data.message);
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message)); // Dispatch failure action

        // Handle the error and provide feedback
        const errorMsg = error?.response?.data?.message || 'Something went wrong';
        ToastOverError(errorMsg);
        callBack(error?.response?.data); // Pass error response to the callback
        HandleError(error?.response?.data); // Call error handler
    }
};

export const updateMainCategoriesAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/main-category-update`, value, {
            headers: authHeader(),
        });
        console.log("data?.data-->",data?.data);
        callBack(data?.data)
        if (data?.data.status === false) {
            ToastOverError(data?.data?.message);
        }
        else {
            ToastOverSuccess(data?.data?.message)
        }
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const mainCategoriesStatusUpdateAction = (value, callBack) => async (dispatch) => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/main-category-statusChange`, value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        if (data?.data.status === false) {
            ToastOverError(data?.data?.message);
        }
        else {
            ToastOverSuccess(data?.data?.message)
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message));

        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
// Action to fetch paginated role list
export const mainCategoriesListAction = (payload) => async (dispatch) => {
    try {

        dispatch(fetchDataLoading());
        // Request paginated data from the API
        const { data } = await axiosBaseURL.post(`${ApiUrl}/main-category-list`, {
            page: payload.page,          // Pass page number to the API
            limit: payload.limit      // Pass page size to the API
        }, {
            headers: authHeader(),
        });

        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the pagination data
            dispatch(fetchMainCategorylistSuccess({
                loading: false,
                mainCategorylist: data?.data,    // Array of role for the current page
                currentPage: data?.pagination?.page,    // Current page number from API response
                totalPages: data?.pagination?.totalPages,      // Total pages calculated by the API
                pageSize: data?.pagination?.limit,                        // Page size (number of items per page)
                totalItems: data?.pagination?.total       // Total number of items from the API
            }));
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message));
        ToastOverError(error?.response?.data?.message);
        HandleError(error?.response?.data);
    }
};
export const activeMainCategoryListAction = () => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active permission list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-main-category`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active permission list
            dispatch(fetchActiveMainCategoryListSuccess({
                loading: true,
                data: data?.data    // Array of roles from the API response
            }));
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message)); // Handle API failure
        ToastOverError(error?.response?.data?.message);
        HandleError(error?.response?.data);
    }
};
export const mainCategoriesDeleteAction = (value, callBack) => async (dispatch) => {
    try {
        const config = {
            headers: authHeader(),
            data: { id: value.id } // Pass the ID in the `data` field for DELETE requests
        };

        const { data } = await axiosBaseURL.delete(`${ApiUrl}/main-categories`, config);

        callBack(data);
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            ToastOverSuccess(data?.message);
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message));

        ToastOverError(error?.response?.data?.message);
        callBack(error?.response?.data);
        HandleError(error?.response?.data);
    }
};