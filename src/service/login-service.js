import axios from 'axios';
import { rootPath } from '../configs/enviroment';

export function loginService(dataLogin){
   return axios.post(`${rootPath}/api/login/`,{
    email : dataLogin.email,
    password : dataLogin.password,
    type : dataLogin.type
  })
} 

export function ckeckTokenService(accessToken){
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}` 
  return axios.get(`${rootPath}/api/token/status`);
} 

export function getInfoUser(){
  return axios.get(`${rootPath}/api/token/info`);
} 

