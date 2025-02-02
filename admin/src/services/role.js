import * as opsService from "./Ops";

import { BaseUrl } from "../Constent/baseUrl";

const roleAdd = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/role-create", data, jwtToken);
    return result;

  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const roleUpdate = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.putData(BaseUrl + "/role-update", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }

  }
}
const getrole = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/role-list", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const getActivePermission = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.getData(BaseUrl + "/active-permission", jwtToken);
    return result;

  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const getActiveRole = async ()=>{
  
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.getData(BaseUrl + "/active-role", jwtToken);
    return result;

  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
export {
  roleAdd, getrole, roleUpdate, getActivePermission,getActiveRole
}