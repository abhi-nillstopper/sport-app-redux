import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_AXIOS_BASE_URL.trim(),
});
api.interceptors.request.use(function (config) {
  const user = localStorage.getItem("user");
  if (user) {
    config.headers = { user };
  }
  return config;
});

export default api;
