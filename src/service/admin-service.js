import { rootPath } from '../configs/enviroment';
import http  from './interceptors';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancel;


// manage User
export function getListUserWithPermision(permission, startIndex, endIndex){
  return http.get(`${rootPath}/api/admin/user/list/${permission}-${startIndex}-${endIndex}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

export function blockUserService(userID){
  return http.post(`${rootPath}/api/admin/user/block/${userID}`,{
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

export function unblockUserService(userID){
  return http.post(`${rootPath}/api/admin/user/unblock/${userID}`,{
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

export function blockMultiUserService(arrID){
  return http.post(`${rootPath}/api/admin/user/change-block`,
  {
    ids: arrID ,
    isBlock: true
  },
  {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

export function unblockMultiUserService(arrID){
  return http.post(`${rootPath}/api/admin/user/change-block`,
  {
    ids: arrID ,
    isBlock: false
  },
  {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
}


// manage Category
export function getALLCategory(){
  return http.get(`${rootPath}api/admin/category/list`,{
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

// manage category
export function getListCategoryWithPermision(typeGet, startIndex, endIndex){
  return http.get(`${rootPath}/api/category/list/${startIndex}-${endIndex}-${typeGet}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

export function addNewCategoryWithPermision(newCategory){
  return http.post(`${rootPath}/api/admin/category/add`, {
    name: newCategory.name ,
    parentId: newCategory.parentId,
    isShow: newCategory.isShow
  },{
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 


// payment 
export function getListPaymentWithPermision(startIndex, endIndex){
  return http.get(`${rootPath}/api/admin/payment/list/${startIndex}-${endIndex}`, {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    })
  });
} 

export function addNewPaymentWithPermision(newPayment){
  return http.post(`${rootPath}/api/admin/payment/add`, {
    name: newPayment.name ,
    description: newPayment.description,
  },{
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