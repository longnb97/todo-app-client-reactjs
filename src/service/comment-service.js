import http from './interceptors';
import { rootPath } from '../configs/enviroment';

export function getAllCommentInTask(taskId) {
   return http.get(`${rootPath}/api/comments/task/${taskId}`);
}

export function getAllUserInProject(projectID) {
    return http.get(`${rootPath}/api/projects/${projectID}/participants`);
} 
