import * as opsService from "./Ops";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BaseUrl } from "../Constent/baseUrl";
const loginAdmin = async (data) => {
  try {
    let result = await opsService.postdata(BaseUrl + "/login", data);
    return result;
      
  } catch (error) {
    if (error.response) {
      // If the server responded with a status code
      if (error.response.status === 403) {
        console.log("Response Data:", error.response.data.message);  // e.g., error message from the server
        toast.dismiss();

        toast.error(error.response.data.message);
      }
    } else if (error.request) {
      // If the request was made but no response was received
      console.log("No response received:", error.request);
    } else {
      // If something else caused the error
      console.log("Error:", error.message);
    }
    
  }
};

const getSideBarAdmin = async (data) => {
  try {
    const result = await opsService.getData(BaseUrl + "/rolebyPermission", data);
    return result;
  } catch (error) {
    console.error("Error in getSideBarAdmin:", error);
    if (error.response) {
      // If the server responded with a status code
      if (error.response.status === 403) {
        console.log("Response Data:", error.response.data.message);  // e.g., error message from the server
        toast.dismiss();

        toast.error(error.response.data.message);
      }
    } else if (error.request) {
      // If the request was made but no response was received
      console.log("No response received:", error.request);
    } else {
      // If something else caused the error
      console.log("Error:", error.message);
    }
    //  throw error; // Re-throw the error to handle it elsewhere if needed
  }
};
const changePassword = async (data) => {
  try {
    const result = await opsService.postdata(BaseUrl + "/change-password", data, localStorage.getItem("jwtToken"));
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const getActiveCountry = async ()=>{
  try {

    const result = await opsService.getData(BaseUrl + "/active-country", localStorage.getItem("jwtToken"));
    console.log("result-->",result);
    
    return result;
  } catch (error) {
    if (error.response.status) {
      return { status: false, message: error.response.data.message }
    }
  }
}
const getActiveStateByCountryId = async (country_id)=>{
  try {

    const result = await opsService.getData(BaseUrl + `/active-state/${country_id}`, localStorage.getItem("jwtToken"));
  
    if(result.status === true){
      return result;
    }
    else{
      return { status: false, message: result.message }

    }
  } catch (error) {
    console.log("error-->",error);
    if (error.response.status) {
      return { status: true, message: error.response.data.message }
    }
   
  }
}
const getActiveCityStateByCountryId = async (country_id,state_id)=>{
  try {

    const result = await opsService.getData(BaseUrl + `/active-city/${country_id}/${state_id}`, localStorage.getItem("jwtToken"));
  
    if(result.status === true){
      return result;
    }
    else{
      return { status: false, message: result.message }

    }
  } catch (error) {
    console.log("error-->",error);
    if (error.response.status) {
      return { status: true, message: error.response.data.message }
    }
   
  }
}


export { loginAdmin, getSideBarAdmin, changePassword,getActiveCountry,getActiveStateByCountryId,getActiveCityStateByCountryId };
