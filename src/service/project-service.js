import http from './interceptors';
import { rootPath } from '../configs/enviroment';

const baseUrl = `${rootPath}/api/projects`

export function getUserProjects(userId) {
   return http.get(baseUrl + '/user/' + userId);
}

export function createNewProject(projectInfo) {
   return http.post(baseUrl, projectInfo);
} 
