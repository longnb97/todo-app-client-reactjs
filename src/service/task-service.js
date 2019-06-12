import http  from './interceptors';
import { rootPath } from '../configs/enviroment';


export  function getAllTaskByProjectId(projectId){
   return http.get(`${rootPath}/api/tasks/project/${projectId}`)
} 
 

export   function addNewTask(task){
   return http.post(`${rootPath}/api/tasks`,{
      owner : task.owner ,
      dueDate : task.dueDate,
      projectId : task.projectId,
      status: task.status,
      description: task.description
  })
} 