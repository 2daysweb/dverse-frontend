import {combineReducers} from 'redux';
import jobsReducer from './jobsReducer';
import usersReducer from './usersReducer';
import visibilityFilterReducer from './visibilityFilterReducer';


export default combineReducers({
    jobs: jobsReducer,
    users: usersReducer,
    filters: visibilityFilterReducer
  })
  
 