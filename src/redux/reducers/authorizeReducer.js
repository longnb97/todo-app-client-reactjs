// reducer chi tinh toan 
// Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.
// function chi tiet cua Action
// đối chiếu action.type bên file checkoAuthorizeAction.js => xác nhận sẽ thực hiện Action nào

const checkAuthorizeReducer = (authenticationInfoDefault= { isLogin: false, role: null} , action) => {
    switch (action.type) {
      case 'LOGIN':
        return action.authenticationInfo;// là giá trị mà checkAuthorizeAction.js trả về (isLogin)
      default:
        return authenticationInfoDefault;// giá trị mặc định khi không có giá trị
     
    }
};
  
export default checkAuthorizeReducer;
  