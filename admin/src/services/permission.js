import * as opsService from "./Ops";

import { BaseUrl } from "../Constent/baseUrl";

const permissionAdd = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/permission-create", data, jwtToken);
    return result;

  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }

  }
}
const permissionUpdate = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.putData(BaseUrl + "/permission-update", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const getPermission = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/permission-list", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const permissionStatusChange = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.putData(BaseUrl + "/permission-statusChange", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
export {
  permissionAdd, getPermission, permissionUpdate,permissionStatusChange
}