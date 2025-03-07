import { useState, useEffect } from "react";
import axios from "axios";
import { authHeader } from "../common/Apis/authHeader";

import baseUrl from "../common/Apis/baseUrl";

const useFetchPost = (url,sendData) => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.post(baseUrl.url+url,sendData,{ headers:authHeader()})
      .then((res) => {
        console.log(res.data);
      setData(res.data)
      }).catch((e)=>{
        console.log(e);
      })      
  }, [url]);

  return [data];
};

export default useFetchPost;