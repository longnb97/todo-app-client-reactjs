import { rootPath } from '../configs/enviroment';
import http  from './interceptors';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;

// manage Product

export function getAllProductOfCustomer(){
  return http.get(`${rootPath}/api/provider/product/list`,{
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 


export function addNewProduct(newProduct){
  return http.post(`${rootPath}/api/provider/product/add`,newProduct ,{
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

// cancel Request
export default function cancelRequest() {
  cancel();
}


// an 5cc6a0d61ec84a233589994f
// gia dung 5cc5c125816c137d55a9428a