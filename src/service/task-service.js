import http  from './interceptors';
import { rootPath } from '../configs/enviroment';


export  function getAllTaskByProjectId(projectId){
   return http.get(`${rootPath}/api/tasks/project/${projectId}`)
} 
 
export  function deleteTask(taskid){
   return http.delete(`${rootPath}/api/tasks/${taskid}`)
} 

export  function addNewTask(newTask){
   return http.post(`${rootPath}/api/tasks`,newTask)
} 

export  function updateTask(taskEdited, taskid){
   return http.put(`${rootPath}/api/tasks/${taskid}`,taskEdited)
} 