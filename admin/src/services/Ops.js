import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const postdata = async (url = "", data, token = false) => {
  try {
    let tokendata = "";

  if (token) {
    tokendata = "Bearer " + token;
  }

  let response = await axios.post(url, data, {
    headers: { 
      Authorization: tokendata,
      'Content-Type': 'application/json'
    }
  });  return response.data;
  } catch (error) {
    console.log("erroe->",error);
    if(error.response.status==0){
      window.location.href= "/";
    }
    else{
      return {status :false,message:error.response.data.message};

    }
  }
};

const getData = async (url = "", token = false) => {
 try {
  if (token) {
    token = "Bearer " + token;
  }
  let response = await axios.get(url, { headers: { Authorization: token, 'Content-Type': 'application/json' } });
  if(response.data.status){
    return response.data;  
  }
  else{
    toast.dismiss();
    toast.error(response.data.message);

    return false;  
  }
 } catch (error) {
  if(error.message==='Network Error'){
    localStorage.clear();
    window.location.href="/";

  }
  if(error.response.status === 400){
    toast.dismiss();
    toast.error(error.response.data.message);
  }
  if(error.response.data.status == false){
    toast.dismiss();
    toast.error(error.response.data.message);
  }
  if(error.response.status===403){
    toast.dismiss();
    toast.error(error.response.data.message);
   localStorage.clear();
   setTimeout(() => {
    return window.location.href="/";
    
   }, 2000);
  }
 }
};

const deleteData = async (url = "", token = false) => {
  if (token) {
    token = "Bearer " + token;
  }
  let response = await axios.delete(url, { headers: { Authorization: token } });

  return response.data;
};

const putData = async (url = "", data, token = false) => {
  if (token) {
    token = "Bearer " + token;
  }
  let response = await axios.put(url, data, {
    headers: { Authorization: token },
  });

  return response.data;
};

const postDataContent = async (url = "", data, token = false, contentType) => {
  try {
    let tokenData = "";
    if (token) {
      tokenData = "Bearer " + token;
    }

    let response = await axios.post(url, data, {
      headers: { Authorization: tokenData, contentType: contentType },
    });

    return response.data;
  } catch (error) {}
};

export async function downloadFile(fileUrl, data, token = false) {
  if (token) {
    token = "Bearer " + token;
  }
  axios
    .post(fileUrl, data, {
      responseType: "blob",
      headers: { Authorization: token },
    })
    .then(function (response) {
      const type = response.headers["content-type"];
      const blob = new Blob([response.data], { type: type, encoding: "UTF-8" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = data.fileName;
      link.click();
    });
}

export { postdata, getData, deleteData, putData, postDataContent };
