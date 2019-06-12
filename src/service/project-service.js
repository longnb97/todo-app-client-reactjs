import http from './interceptors';
import { rootPath } from '../configs/enviroment';

const baseUrl = `${rootPath}/api/projects`

export function getAllProjectService() {
   return http.get(baseUrl);
}

export function createProject(projectInfo) {
   return http.post(baseUrl, projectInfo);
} 
