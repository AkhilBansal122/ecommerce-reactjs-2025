import * as opsService from "./Ops";
import { BaseUrl } from "../Constent/baseUrl";

export const productAdd = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/product-create", data, jwtToken);
    return result;

  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }

  }
}

export const productUpdate = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.putData(BaseUrl + "/product-update", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}

export const getProduct = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/product-list", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
export const getActiveCategory = async () => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.getData(BaseUrl + "/active-category", jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}

export  const  productStatusChange = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/product-statusChange", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}

export const getSubCategoryByCategoryId = async (data) => {
  try {
    const jwtToken = localStorage.getItem("jwtToken");
    let result = await opsService.postdata(BaseUrl + "/active-subCategoryByCategoryId", data, jwtToken);
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
