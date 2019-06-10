import axios from "axios";
import Promise from "promise";
import { rootPath } from "../configs/enviroment";

axios.defaults.baseURL = `${rootPath}`;

const http = axios.create({
  headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use(
  config => {
    let token = localStorage.getItem(token);
    // let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1NjAxNDY4ODAsImV4cCI6MTU2MDc0Njg4MCwibmJmIjoxNTYwMTQ2ODgwLCJqdGkiOiJZNXdLTTBpRjFad09sWGhKIiwic3ViIjo3LCJwcnYiOiJiNmY3ZjQ3YWNiZjFhNWVlMTFiMmIwMjhkYzU2YWEzNWYyMGMxYTdlIn0.867YPHh8TN9W3qwjFMlXn0le3yVscyN61xIP-SD2G4U";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default http;
