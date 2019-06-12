export function getStorageService(storageName){
    return new Promise( (resolve, reject) => {
      let dataLocal = localStorage.getItem(storageName);
      if (dataLocal !== undefined){
        resolve(dataLocal);
      } 
      else{
        resolve( `${storageName} invalid`);
      }
    })
  } 
  
  
export function setStorageService(storageName, data){
  return new Promise( (resolve, reject) => {
    localStorage.setItem(storageName, data);
    resolve('set token success');
  })
  
} 
  
  