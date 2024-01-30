import axios from "axios";

//FOR LOCAL SERVER
const devApi = "http://localhost:3000/api/v1";

//FOR live SERVER
// const prodApi = "http://18.191.247.189:3000/api/v1";

let instance = axios.create({
  baseURL: process.env.API_END_POINT,
  // baseURL: devApi,
  responseType: "json",
});

// instance.defaults.headers.common["Authorization"] = localStorage.getItem("token");
//bijan
export default instance;
