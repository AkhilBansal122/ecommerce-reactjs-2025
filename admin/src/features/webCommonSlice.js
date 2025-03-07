
import { authHeader } from "../common/Apis/authHeader";
import axiosBaseURL from "../common/Apis/axiosBaseURL";
import HandleError from "../common/Apis/HandleError";
import { ToastOverError, ToastOverSuccess } from "../common/Toast/ToastOver";


///// CMS Callback Action ///
export const cmsDetailsAction = (value, callBack) => async () => {
    try {
        const data = await axiosBaseURL.post('/user/cms/details', value, {
            headers: authHeader(true),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};

export const PointSystemAction = (id, callBack) => async () => {
    try {
        const data = await axiosBaseURL.get(`/user/points/list?sports_id=${id}`, {
            headers: authHeader(true),
        });
        callBack(data?.data)
    } catch (error) {
        ToastOverError(error?.response?.data?.message)
        callBack(error?.response?.data)
        HandleError(error?.response?.data)
    }
};