import axios from "axios";
import Cookies from "js-cookie";
export const axiosClient = axios.create({
  baseURL: "http://localhost:8080/identity/",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const sessionToken = Cookies.get("token");
  if (sessionToken) {
    config.headers.Authorization = `Bearer ${sessionToken}`;
  }
  return config;
});

export default axiosClient;
