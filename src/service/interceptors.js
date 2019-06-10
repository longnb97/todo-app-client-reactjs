import axios from "axios";
import Promise from "promise";
import { rootPath } from "../configs/enviroment";

axios.defaults.baseURL = `${rootPath}`;

const http = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use(
  config => {
    let token = localStorage.getItem(token);
    // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGFwcHktZGV2Lmhlcm9rdWFwcC5jb20vYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1NjAwMTEwMjEsImV4cCI6MTU2MDA5NzQyMSwibmJmIjoxNTYwMDExMDIxLCJqdGkiOiJYVkZXcnJwR0V3bHNoMWhlIiwic3ViIjo2LCJwcnYiOiJiNmY3ZjQ3YWNiZjFhNWVlMTFiMmIwMjhkYzU2YWEzNWYyMGMxYTdlIn0.DRxgvN_5_mwq0Ykso-3b0aj_x24rsz21yrW7O61Em14";
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
