import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../common/Apis/authHeader";
import axiosBaseURL, { ApiUrl } from "../common/Apis/axiosBaseURL";
import { ToastOverError, ToastOverSuccess } from "../common/Toast/ToastOver";
import HandleError from "../common/Apis/HandleError";

const initialState = {
    subcategoryList: [],  // List of role for the current page
    currentPage: 1,      // Current page number
    totalPages: 1,       // Total number of pages
    pageSize: 10    ,        // Number of items per page
    totalItems: 0,       // Total number of items
    loading: false,      // Loading state for data fetch
    error: null,         // Error message
    activePermissionList:[]
};
const subCategorySlice = createSlice({
    name: "subCategory",
    initialState,
    reducers: {
        fetchDataLoading(state) {
            state.loading = true;
        },
        fetchApiFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchSubCateogoriesListSuccess(state, action) {
            state.loading = action.payload.loading;
            state.subcategoryList = action.payload.data;
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
        fetchActiveSubCategoriesListSuccess(state, action) {
           state.loading = action.payload.loading;
           state.activePermissionList = action.payload.data;
        },
        resetSubCategoriesList(){
        return initialState;
        }
    }
});
export default subCategorySlice.reducer;
export const { fetchDataLoading, fetchApiFailure, fetchSubCateogoriesListSuccess,resetSubCategoriesList,fetchActiveSubCategoriesListSuccess, setPage,resetRoleList, setPageSize } = subCategorySlice.actions;

export const AddSubCateogoriesAction = (value, callBack) => async (dispatch) => {
    try {
        const data = await axiosBaseURL.post(`${ApiUrl}/sub-category-create`, value, {
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
export const updateSubCategoriesAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/sub-category-update`, value, {
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
export const subcategoriesStatusUpdateAction = (value, callBack) => async (dispatch) => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/sub-category-statusChange`, value, {
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
export const subCategoryListAction = (payload) => async (dispatch) => {
    try {

        dispatch(fetchDataLoading());
        // Request paginated data from the API
        const { data } = await axiosBaseURL.post(`${ApiUrl}/sub-category-list`, {
            page: payload.page,          // Pass page number to the API
            limit: payload.limit      // Pass page size to the API
        }, {
            headers: authHeader(),
        });

        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the pagination data
            dispatch(fetchSubCateogoriesListSuccess({
                loading: false,
                data: data?.data,    // Array of role for the current page
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
export const activeSubCategoriesListAction = () => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active permission list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-sub-category`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active permission list
            dispatch(fetchActiveSubCategoriesListSuccess({
                loading:true,
                data: data?.data    // Array of roles from the API response
            }));
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message)); // Handle API failure
        ToastOverError(error?.response?.data?.message);
        HandleError(error?.response?.data);
    }
};
export const deleteSubCategoryAction = (value, callBack) => async (dispatch) => {
    try {

        const config = {
            headers: authHeader(),
            data: value,  // Pass the value inside 'data' for DELETE requests
        };
        const data = await axiosBaseURL.delete(`${ApiUrl}/sub-categories`, config);

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
