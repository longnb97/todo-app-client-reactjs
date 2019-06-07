// ket hop cac reducer lai
// 1 reducer sẽ có nhiều action, nhưng chỉ trả về 1 giá trị
import { combineReducers } from 'redux';
import checkAuthorizeReducer from './authorizeReducer';

const rootReducer = combineReducers({
   authenticationInfo : checkAuthorizeReducer
});

export default rootReducer;