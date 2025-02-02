import * as opsService from "./Ops";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseUrl } from "../Constent/baseUrl";

const subAdminAdd = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/subadmin-create", data, jwtToken);
    return result;

  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }

  }
}
const subAdminUpdate = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.putData(BaseUrl + "/subadmin-update", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const getSubAdminList = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/subadmin-list", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const subAdminStatusChange = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.putData(BaseUrl + "/subadmin-statusChange", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
export {
  subAdminAdd, getSubAdminList, subAdminUpdate,subAdminStatusChange
}