
import { callback } from "chart.js/helpers";
import { authHeader } from "../common/Apis/authHeader";
import axiosBaseURL, { ApiUrl } from "../common/Apis/axiosBaseURL";
import HandleError from "../common/Apis/HandleError";
import { ToastOverError, ToastOverSuccess } from "../common/Toast/ToastOver";
import axios from "axios";





export const dashboardAction = (value, callBack) => async () => {
    try {
        console.log(value);
        const data = await axiosBaseURL.post('/dashboard', value, {
            headers: authHeader(),
        });
        console.log(data);
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


///// User Management Callback Action ///
export const UserListAction = (value, callBack) => async () => {
    try {
        console.log(value);
        const data = await axiosBaseURL.post('/user_list', value, {
            headers: authHeader(),
        });
        console.log(data);
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};





export const UserStatusUpdateAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`/user-status`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const UserDetailsAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/users/view', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const UserUpdateDetailsAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/admin/user/update', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};



export const CMSStatusUpdateAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`/cms-type-status`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


//     delete api


export const PrivacyAndPolicyDeleteAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`privacy-policies-delete`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};

export const CmsDeleteAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`cms-delete`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};

export const FaqQueAnsDeleteAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`/faq-delete`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


export const CommonPostAction = (url,value, callBack) => async () => {
    try {
        console.log(value);
        const data = await axiosBaseURL.post(url, value, {
            headers: authHeader(),
        });
     
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


export const TermDeleteAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`terms_conditions-delete`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


///// CMS Management Callback Action ///
export const CMSListAction = (value,callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/cms/list',value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


export const FaqCatListAction = (value,callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/faq_category_list',value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
}; 

export const FaqQueAnsListAction = (value,callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/faq-list',value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


export const CMSDetailAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/detail-cms', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};

export const CMSUpdateDetailsAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/cms/update', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        //HandleError(error?.response?.data)
    }
};

export const QueAnsUpdateDetailsAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/faq-update', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        //HandleError(error?.response?.data)
    }
};


export const CMSAddDetailsAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/add-cms', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};



export const FaqAddAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/faq-add', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};

///// Subadmin Management Callback Action ///
export const SubadminListAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post(`/admin/subadmin/list`, value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const SubadminStatusUpdateAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`admin/subadmin/status-update`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const SubadminDeleteAction = (value, callback) => async () => {
    try {
        const data = await axiosBaseURL.post(`admin/subadmin/delete`, value, {
            headers: authHeader(),
        });
        callback(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callback(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const SubadminCreateAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/admin/subadmin/create', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const SubadminUpdateAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/admin/subadmin/update', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
        ToastOverSuccess(data?.data?.message)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};
export const SubadminDetailAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/admin/subadmin/view', value, {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};

//  active user listing for notification send 

export const ActiveUserListAction = (callBack) => async () => {
    try {
        const data = await axiosBaseURL.get('/userlist', {
            headers: authHeader(),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};


export const NotificaticationSenAction = (value, callBack) => async () => {
    try {
        // console.log(value , "VCDGFSGHDFDF");

        const data = await axiosBaseURL.post('/send-notification', value, {
            headers: authHeader(),
        });
        console.log(data);
        callBack(data?.data)
    } catch (error) {
        // console.log("SOMEEROIHJDSS","here error erexcxdzhjasfd")
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};