import axios from 'axios';
import { rootPath } from '../configs/enviroment';

export   function signUpService(dataRegister){
   return axios.post(`${rootPath}/api/register/`,{
    username : dataRegister.username,
    password : dataRegister.password,
    email : dataRegister.email ,
    type : dataRegister.type
  })
} 