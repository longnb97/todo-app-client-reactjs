import axios from 'axios';
import { rootPath } from '../configs/enviroment';
import http from './interceptors';

export function loginService(dataLogin){
  let accountlogin = {
    email : dataLogin.email,
    password : dataLogin.password
  };

   return http.post(`${rootPath}/api/auth/login`,accountlogin);
} 

export function ckeckTokenService(accessToken){
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}` 
  return axios.get(`${rootPath}/api/token/status`);
} 

export function getInfoUser(){
  return axios.get(`${rootPath}/api/token/info`);
} 

