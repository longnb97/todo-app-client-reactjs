import axios from 'axios';
import { rootPath } from '../configs/enviroment';
import http from './interceptors';

export function loginService(dataLogin){
  //  return http.post(`${rootPath}api/auth/login`,{
  //   email : dataLogin.email,
  //   password : dataLogin.password
  // })

  return http.get('https://happy-dev.herokuapp.com/api/accounts');
} 

export function ckeckTokenService(accessToken){
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}` 
  return axios.get(`${rootPath}/api/token/status`);
} 

export function getInfoUser(){
  return axios.get(`${rootPath}/api/token/info`);
} 

