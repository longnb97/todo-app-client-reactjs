import http  from './interceptors';
import { rootPath } from '../configs/enviroment';


export  function getAllProjectService(dataRegister){
   return http.get(`${rootPath}/api/projects`)
} 
