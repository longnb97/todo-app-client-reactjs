import http from './interceptors';
import { rootPath } from '../configs/enviroment';

const baseUrl = `${rootPath}/api/projects`

export function getUserProjects(userId) {
   return http.get(baseUrl + '/all_projects/user/' + userId);
}

export function createProject(projectInfo) {
   return http.post(baseUrl, projectInfo);
} 
