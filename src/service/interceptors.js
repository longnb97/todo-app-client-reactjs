import { getStorageService } from "./storeage-service";
import axios from "axios";
import Promise from "promise";
import { rootPath } from "../configs/enviroment";

axios.defaults.baseURL = `${rootPath}`;

const http = axios.create({
  headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "http://localhost:3000/" }
});

http.interceptors.request.use((config) => {
  let token = localStorage.getItem(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
  return Promise.reject(error);
});

export default http;

