import axios from "axios";



const axiosInstance = axios.create({
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
  timeout: 20000, // default is `0` (no timeout)
  baseURL: "http://localhost:3000",
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "Access-Control-Allow-Origin";
axiosInstance.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
axiosInstance.defaults.headers.common["Access-Control-Allow-Headers"] = "Content-Type, Authorization";
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use((response) => {
  return response;
});

export default axiosInstance;
