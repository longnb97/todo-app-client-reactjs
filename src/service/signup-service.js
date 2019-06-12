import http  from './interceptors';
import axios  from 'axios';
import { rootPath } from '../configs/enviroment';

export   function signUpService(dataRegister){
   return http.post(`${rootPath}/api/accounts/signup`,{
    email : dataRegister.email ,
    name : dataRegister.username,
    password : dataRegister.password,
    job: dataRegister.job,
    company: dataRegister.company
  })
} 

// export  function signUpService(dataRegister){
// // fix err
//   return http.get(`${rootPath}/api/accounts`);
// } 