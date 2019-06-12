import http  from './interceptors';
import { rootPath } from '../configs/enviroment';


export  function getAllTaskByProjectId(projectId){
   return http.get(`${rootPath}/api/tasks/project/${projectId}`)
} 
