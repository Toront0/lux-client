import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: `https://${import.meta.env.VITE_BACKEND_ORIGIN}`
};

axios.interceptors.response.use(undefined, (e) => {
  // this is the main part. Use the response property from the e object

  console.log("222", e.response);

  return e.response;
});

export const axiosInstance = axios.create(config);
