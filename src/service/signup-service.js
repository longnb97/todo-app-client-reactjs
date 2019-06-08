import http  from './interceptors';
import axios  from 'axios';
import { rootPath } from '../configs/enviroment';

export   function signUpService(dataRegister){
   return http.post(`${rootPath}api/signup`,{
    username : dataRegister.username,
    password : dataRegister.password,
    email : dataRegister.email ,
    job: dataRegister.job,
    company: dataRegister.company
  })
} 