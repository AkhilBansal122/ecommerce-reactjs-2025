import axios from "axios";

export const server = {
      baseURL: "http://localhost:5000/api/admin",
     imagebaseURL: "http://localhost:5000",

    //  imagebaseURL: "http://192.168.3.17:4050",
    //   baseURL: "http://192.168.3.17:4050/admin",
};

export default axios.create({
    baseURL: server.baseURL
});

export const ImageBaseURL = server.imagebaseURL
export const ApiUrl = server.baseURL
