import axios from 'axios';
import { rootPath } from '../configs/enviroment';
import http from './interceptors';

const baseURL = `${rootPath}/api/auth/`;

export function loginService(user) {
  let userInfo = {
    email: user.email,
    password: user.password
  };

  return http.post(baseURL + 'login', userInfo);
}

export function ckeckTokenService(accessToken) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
  return axios.get(`${rootPath}/api/token/status`);
}

export function getInfoUser() {
  return axios.get(`${rootPath}/api/token/info`);
}

export function getInfoUserLocal() {
  var userDataString = localStorage.getItem("userData");
  var userDataObject = JSON.parse(JSON.parse(JSON.stringify(userDataString)));
  return userDataObject;
}

