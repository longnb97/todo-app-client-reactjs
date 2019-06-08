import { getStorageService } from "./storeage-service";
import axios from "axios";
import Promise from "promise";
import { rootPath } from "../configs/enviroment";

axios.defaults.baseURL = `${rootPath}`;

const http = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
    'Access-Control-Allow-Credentials': true
  }
});

http.interceptors.request.use(
  config => {
    let token = localStorage.getItem(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;
