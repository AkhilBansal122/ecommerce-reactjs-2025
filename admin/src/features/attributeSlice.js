import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../common/Apis/authHeader";
import axiosBaseURL, { ApiUrl } from "../common/Apis/axiosBaseURL";
import { ToastOverError, ToastOverSuccess } from "../common/Toast/ToastOver";
import HandleError from "../common/Apis/HandleError";

const initialState = {
    attributelist: [],  // List of role for the current page
    currentPage: 1,      // Current page number
    totalPages: 1,       // Total number of pages
    pageSize: 1,        // Number of items per page
    totalItems: 0,       // Total number of items
    loading: false,      // Loading state for data fetch
    error: null,         // Error message
    activeAttributeList: [],
    
};
const attributeSlice = createSlice({
    name: "attribute",
    initialState,
    reducers: {
        fetchDataLoading(state) {
            state.loading = true;
        },
        fetchApiFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchattributelistSuccess(state, action) {
            state.loading = action.payload.loading;
            state.attributelist = action.payload.attributelist;
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
        fetchActiveAttributeListSuccess(state, action) {
            state.loading = action.payload.loading;
            state.activeAttributeList = action.payload.data;
        },
          // New action to reset the category list
          resetAttributeListAction() {
            return initialState;
        },
    }
});
export default attributeSlice.reducer;

export const { fetchDataLoading, fetchApiFailure, fetchcaotegorylistSuccess,fetchActiveAttributeListSuccess, setPage, setPageSize,resetCategoryList,fetchattributelistSuccess,resetAttributeListAction } = attributeSlice.actions;

export const addAttributeAction = (value, callBack) => async (dispatch) => {
    try {
        // Make API request
        const { data } = await axiosBaseURL.post(`${ApiUrl}/attribute-create`, value, {
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

export const updateAttributeesAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/attribute-update`, value, {
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
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const attributeesStatusUpdateAction = (value, callBack) => async (dispatch) => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/attribute-statusChange`, value, {
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
export const attributeesListAction = (payload) => async (dispatch) => {
    try {

        dispatch(fetchDataLoading());
        // Request paginated data from the API
        const { data } = await axiosBaseURL.post(`${ApiUrl}/attribute-list`, {
            page: payload.page,          // Pass page number to the API
            limit: payload.limit      // Pass page size to the API
        }, {
            headers: authHeader(),
        });

        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the pagination data
            dispatch(fetchattributelistSuccess({
                loading: false,
                attributelist: data?.data,    // Array of role for the current page
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
export const activeAttributeListAction = () => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active permission list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-attribute`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active permission list
            dispatch(fetchActiveAttributeListSuccess({
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