import { createSlice } from "@reduxjs/toolkit";
import { authHeader } from "../common/Apis/authHeader";
import axiosBaseURL, { ApiUrl } from "../common/Apis/axiosBaseURL";
import { ToastOverError, ToastOverSuccess } from "../common/Toast/ToastOver";
import HandleError from "../common/Apis/HandleError";

const initialState = {
    subadminlist: [],  // List of subadmins for the current page
    currentPage: 1,      // Current page number
    totalPages: 1,       // Total number of pages
    pageSize: 10,        // Number of items per page
    totalItems: 0,       // Total number of items
    loading: false,      // Loading state for data fetch
    error: null,         // Error message
    roleList:[],
    countryList:[],
    stateList:[],
    cityList:[]
};
const subAdminSlice = createSlice({
    name: "subAdmin",
    initialState,
    reducers: {
        fetchDataLoading(state) {
            state.loading = true;
        },
        fetchApiFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchSubadminListSuccess(state, action) {
            state.loading = action.payload.loading;
            state.subadminlist = action.payload.subadminlist;
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
        fetchActiveRoleSuccess(state, action) {
            state.loading = action.payload.loading;
            state.roleList = action.payload.data;
         },
         fetchActiveCountrySuccess(state, action) {
            state.loading = action.payload.loading;
            state.countryList = action.payload.data;
         },
         fetchActiveStateSuccess(state, action) {
            state.loading = action.payload.loading;
            state.stateList = action.payload.data;
         },
         fetchActiveCitySuccess(state, action) {
            state.loading = action.payload.loading;
            state.cityList = action.payload.data;
         },
         resetSubAdminAction(){
            return initialState;
         }
    }
});
export default subAdminSlice.reducer;
export const { fetchDataLoading, fetchApiFailure, fetchSubadminListSuccess, setPage, setPageSize,fetchActiveRoleSuccess,fetchActiveCountrySuccess,fetchActiveCitySuccess,fetchActiveStateSuccess,resetSubAdminAction } = subAdminSlice.actions;

export const addSubAdminAction = (value, callBack) => async (dispatch) => {
    try {
        const data = await axiosBaseURL.post(`${ApiUrl}/subadmin-create`, value, {
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
export const updatesubadminAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/subadmin-update`, value, {
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
export const subadminStatusUpdateAction = (value, callBack) => async (dispatch) => {
    try {
        const data = await axiosBaseURL.put(`${ApiUrl}/subadmin-statusChange`, value, {
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


// Action to fetch paginated subadmins list
export const subAdminListAction = (payload) => async (dispatch) => {
    try {

        dispatch(fetchDataLoading());
        // Request paginated data from the API
        const { data } = await axiosBaseURL.post(`${ApiUrl}/subadmin-list`, {
            page: payload.page,          // Pass page number to the API
            limit: payload.limit      // Pass page size to the API
        }, {
            headers: authHeader(),
        });

        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the subAdmin data
            dispatch(fetchSubadminListSuccess({
                loading: true,
                subadminlist: data?.data,    // Array of subadmins for the current page
                currentPage: data?.pagination?.page,    // Current page number from API response
                totalPages: data?.pagination?.totalPages,      // Total pages calculated by the API
                pageSize: data?.pagination?.limit,                        // Page size (number of items per page)
                totalItems: data?.pagination?.total       // Total number of items from the API
            }));
          //  ToastOverSuccess(data?.message);
        }
    } catch (error) {
        dispatch(fetchApiFailure(error.message));
        ToastOverError(error?.response?.data?.message);
        HandleError(error?.response?.data);
    }
};
export const activeRoleListAction = () => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active Role list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-role`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active role list
            dispatch(fetchActiveRoleSuccess({
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
export const activeCountryListAction = () => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active Role list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-country`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active role list
            dispatch(fetchActiveCountrySuccess({
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
export const activeStateListAction = (country_id) => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active Role list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-state/${country_id}`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active role list
            dispatch(fetchActiveStateSuccess({
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
export const activeCityListAction = (country_id,state_id) => async (dispatch) => {
    try {
        dispatch(fetchDataLoading()); // Set loading to true before the API request

        // Request active Role list data from the API
        const { data } = await axiosBaseURL.get(`${ApiUrl}/active-city/${country_id}/${state_id}`, {
            headers: authHeader(),
        });
        if (data.status === false) {
            ToastOverError(data?.message);
        } else {
            // Dispatch success and update the state with the active role list
            dispatch(fetchActiveCitySuccess({
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